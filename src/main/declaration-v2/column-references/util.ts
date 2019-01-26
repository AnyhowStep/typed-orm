import {Column, AnyColumn} from "../column";
import {ColumnReferences} from "./column-references";
import {ColumnCollection, ColumnCollectionUtil} from "../column-collection";
import {IsOneStringLiteral} from "../string-util";

export namespace ColumnReferencesUtil {
    //Types only
    export type ColumnsImpl<RefT extends ColumnReferences> = (
        {
            [tableAlias in keyof RefT] : ColumnCollectionUtil.Columns<RefT[tableAlias]>
        }[keyof RefT]
    );

    export type Columns<RefT extends ColumnReferences> = (
        //ColumnReferencesData_ColumnsImpl<DataT>
        //HACK-y
        /*ColumnsImpl<RefT> extends AnyColumn ?
        (
            ColumnsImpl<RefT>
        ) :
        never*/
        Extract<
            ColumnsImpl<RefT>,
            AnyColumn
        >
    );

    export type ColumnCollections<RefT extends ColumnReferences> = (
        {
            [tableAlias in keyof RefT] : (
                RefT[tableAlias] extends ColumnCollection ?
                    RefT[tableAlias] :
                    never
            )
        }[keyof RefT]
    )

    export type Partial<RefT extends ColumnReferences> = (
        {
            readonly [tableAlias in Extract<keyof RefT, string>]+? : {
                readonly [columnName in Extract<keyof RefT[tableAlias], string>]+? : (
                    RefT[tableAlias][columnName] extends AnyColumn ?
                        //For some reason, adding `undefined` to this type causes it
                        //to not be assignable to `PartialColumnReferences`
                        //But the types are still the same
                        (RefT[tableAlias][columnName]) :
                        never
                )
            }
        }
    )

    //Types with implementation
    export type ToNullable<RefT extends ColumnReferences> = (
        {
            readonly [tableAlias in Extract<keyof RefT, string>] : {
                readonly [columnName in Extract<keyof RefT[tableAlias], string>] : (
                    Column<
                        tableAlias,
                        columnName,
                        null|ReturnType<RefT[tableAlias][columnName]["assertDelegate"]>
                    >
                )
            }
        }
    );
    export function toNullable<RefT extends ColumnReferences> (columnReferences : RefT) : (
        ToNullable<RefT>
    ) {
        const result = {} as any;
        for (let tableAlias in columnReferences) {
            if (!columnReferences.hasOwnProperty(tableAlias)) {
                continue;
            }
            const columnCollection = columnReferences[tableAlias];
            if (!(columnCollection instanceof Object)) {
                continue;
            }
            result[tableAlias] = ColumnCollectionUtil.toNullable(columnCollection);
        }
        return result;
    }

    //RefA & RefB & RefC & ...
    export type MergeIntersected<
        T extends ColumnReferences
    > = (
        Extract<
            {
                [k in keyof T] : (
                    T[k]
                )
            },
            ColumnReferences
        >
    )
    export type Merge<
        RefA extends ColumnReferences,
        RefB extends ColumnReferences
    > = (
        Extract<
            {
                [k in keyof (RefA & RefB)] : (
                    (RefA & RefB)[k]
                )
            },
            ColumnReferences
        >
    )/*
    Commenting this out because it causes `tsc` to freak out
    (
        //Keys of A only
        {
            readonly [tableAlias in Extract<Exclude<keyof RefA, keyof RefB>, string>] : (
                RefA[tableAlias] extends ColumnCollection ?
                    RefA[tableAlias] :
                    never
            )
        } &
        //Keys of B only
        {
            readonly [tableAlias in Extract<Exclude<keyof RefB, keyof RefA>, string>] : (
                RefB[tableAlias] extends ColumnCollection ?
                    RefB[tableAlias] :
                    never
            )
        } &
        //Keys of both
        {
            readonly [tableAlias in Extract<Extract<keyof RefA, keyof RefB>, string>] : (
                RefA[tableAlias] extends ColumnCollection ?
                    (
                        RefB[tableAlias] extends ColumnCollection ?
                            ColumnCollectionUtil.Merge<RefA[tableAlias], RefB[tableAlias]> :
                            never
                    ) :
                    never
            )
        }
    );*/
    export function merge<
        RefA extends ColumnReferences|{},
        RefB extends ColumnReferences
    > (
        refA : RefA,
        refB : RefB
    ) : Merge<RefA, RefB> {
        const result = {} as any;
        for (let tableAlias in refA) {
            if (refB.hasOwnProperty(tableAlias)) {
                result[tableAlias] = ColumnCollectionUtil.merge(
                    refA[tableAlias],
                    refB[tableAlias]
                );
            } else {
                result[tableAlias] = refA[tableAlias];
            }
        }
        for (let tableAlias in refB) {
            if (!refA.hasOwnProperty(tableAlias)) {
                result[tableAlias] = refB[tableAlias];
            }
        }
        return result;
    }

    export type ToConvenient<RefT extends ColumnReferences|{}> = (
        keyof RefT extends never ?
            {} :
            IsOneStringLiteral<Extract<keyof RefT, string>> extends true ?
                //There's only one table alias in RefT, we can make things more
                //convenient and less verbose; gives us a column collection
                RefT[Extract<keyof RefT, string>] :
                //We need to keep the verbosity because
                //it's possible for different tables to have the same column names
                //with different data types
                RefT
    );
    export function toConvenient<RefT extends ColumnReferences|{}> (
        ref : RefT
    ) : ToConvenient<RefT> {
        const keys = Object.keys(ref);
        if (keys.length == 1) {
            return (ref as any)[keys[0]] as any;
        } else {
            return ref as any;
        }
    }

    export function hasColumn<
        RefT extends ColumnReferences,
        ColumnT extends AnyColumn
    > (ref : RefT, column : ColumnT) : ref is (
        RefT & {
            readonly [tableAlias in ColumnT["tableAlias"]] : {
                readonly [columnName in ColumnT["name"]] : ColumnT
            }
        }
    );
    export function hasColumn<
        CollectionT extends ColumnCollection,
        ColumnT extends AnyColumn
    > (collection : CollectionT, column : ColumnT) : collection is (
        CollectionT & {
            readonly [columnName in ColumnT["name"]] : ColumnT
        }
    );
    export function hasColumn (ref : any, column : AnyColumn) {
        if (!ref.hasOwnProperty(column.tableAlias)) {
            return ColumnCollectionUtil.hasColumn(ref, column);
        }
        const columnCollection = ref[column.tableAlias];
        return ColumnCollectionUtil.hasColumn(columnCollection, column);
    }
    export function assertHasColumn (ref : ColumnReferences|{}, column : AnyColumn) {
        if (!hasColumn(ref, column)) {
            throw new Error(`Column ${column.tableAlias}.${column.name} does not exist in column references`);
        }
    }
    export function assertHasColumns (ref : ColumnReferences|{}, arr : AnyColumn[]) {
        for (let i of arr) {
            assertHasColumn(ref, i);
        }
    }
    export function assertHasColumnReferences (ref : ColumnReferences|{}, targetReferences : ColumnReferences) {
        for (let tableAlias in targetReferences) {
            if (!targetReferences.hasOwnProperty(tableAlias)) {
                continue;
            }
            const targetColumns = targetReferences[tableAlias];
            if (!(targetColumns instanceof Object)) {
                continue;
            }
            for (let columnName in targetColumns) {
                if (!targetColumns.hasOwnProperty(columnName)) {
                    continue;
                }
                assertHasColumn(ref, targetColumns[columnName]);
            }
        }
    }
}
