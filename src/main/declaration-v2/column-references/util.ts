import {Column, AnyColumn} from "../column";
import {ColumnReferences} from "./column-references";
import {ColumnCollection, ColumnCollectionUtil} from "../column-collection";

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
        ColumnsImpl<RefT> extends AnyColumn ?
        (
            ColumnsImpl<RefT>
            /*AnyColumn extends ColumnOfReferencesImpl<ColumnReferencesT> ?
                ColumnOfReferencesImpl<ColumnReferencesT> :
                never*/
        ) :
        never
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
            [tableAlias in keyof RefT]? : {
                [columnName in keyof RefT[tableAlias]]? : RefT[tableAlias][columnName]
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

    export type Merge<
        RefA extends ColumnReferences,
        RefB extends ColumnReferences
    > = (
        {
            [tableAlias in (keyof RefA)|(keyof RefB)] : (
                tableAlias extends keyof RefA ?
                    (
                        tableAlias extends keyof RefB ?
                            ColumnCollectionUtil.Merge<RefA[tableAlias], RefB[tableAlias]> :
                            RefA[tableAlias]
                    ) :
                    (
                        tableAlias extends keyof RefB ?
                            RefB[tableAlias] :
                            never
                    )
            )
        }
    );
    export function merge<
        RefA extends ColumnReferences,
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
}
