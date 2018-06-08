import * as sd from "schema-decorator";
import {ColumnCollection} from "./column-collection";
import {Column, AnyColumn, ColumnUtil} from "../column";
import {Tuple, TupleKeys} from "../tuple";
import {spread} from "@anyhowstep/type-util";
import {IsOneStringLiteral} from "../string-util";

export namespace ColumnCollectionUtil {
    //Types only
    export type Columns<ColumnCollectionT extends ColumnCollection> = (
        ColumnCollectionT[keyof ColumnCollectionT]
    );
    export type HasOneType<ColumnCollectionT extends ColumnCollection> = (
        IsOneStringLiteral<Extract<keyof ColumnCollectionT, string>> extends true ?
            true :
            false
    );
    export function hasOneType (columnCollection : ColumnCollection) {
        return Object.keys(columnCollection).length == 1;
    }
    export type Types<ColumnCollectionT extends ColumnCollection> = (
        HasOneType<ColumnCollectionT> extends true ?
            (
                {
                    [columnName in Extract<keyof ColumnCollectionT, string>] : (
                        ReturnType<ColumnCollectionT[columnName]["assertDelegate"]>
                    )
                }[Extract<keyof ColumnCollectionT, string>]
            ) :
            {
                [columnName in Extract<keyof ColumnCollectionT, string>] : (
                    ReturnType<ColumnCollectionT[columnName]["assertDelegate"]>
                )
            }
    );
    export type ExcludeColumnNames<ColumnCollectionT extends ColumnCollection, ExcludeT extends string> = (
        {
            readonly [columnName in Exclude<
                Extract<keyof ColumnCollectionT, string>,
                ExcludeT
            >] : (
                ColumnCollectionT[columnName] extends AnyColumn ?
                    ColumnCollectionT[columnName] :
                    never
            )
        }
    );
    export function excludeColumnNames<
        ColumnCollectionT extends ColumnCollection,
        ExcludeT extends string
    > (
        columnCollection : ColumnCollectionT,
        exclude : ExcludeT[]
    ) : ExcludeColumnNames<ColumnCollectionT, ExcludeT> {
        const result = {} as any;
        for (let columnName in columnCollection) {
            if (!columnCollection.hasOwnProperty(columnName)) {
                continue;
            }
            if (exclude.indexOf(columnName as any) < 0) {
                //We want to keep this column
                result[columnName] = columnCollection[columnName];
            }
        }
        return result;
    }

    //Types with implementation
    export type HasColumn<
        ColumnCollectionT extends ColumnCollection,
        ColumnT extends AnyColumn
    > = (
        ColumnT["name"] extends keyof ColumnCollectionT ?
            (
                ColumnT["tableAlias"] extends ColumnCollectionT[ColumnT["name"]]["tableAlias"] ?
                    (
                        ColumnT["name"] extends ColumnCollectionT[ColumnT["name"]]["name"] ?
                            (
                                //No run-time check for this
                                ReturnType<ColumnT["assertDelegate"]> extends ReturnType<ColumnCollectionT[ColumnT["name"]]["assertDelegate"]> ?
                                    (true) :
                                    false
                            ) :
                            false
                    ) :
                    false
            ) :
            false
    );
    export function hasColumn<
        ColumnCollectionT extends ColumnCollection,
        ColumnT extends AnyColumn
    > (columnCollection : ColumnCollectionT, other : ColumnT) : (
        HasColumn<ColumnCollectionT, ColumnT>
    ) {
        if (!columnCollection.hasOwnProperty(other.name)) {
            return false as any;
        }
        const column = columnCollection[other.name];
        if (!(column instanceof Column)) {
            return false as any;
        }
        return (
            column.tableAlias == other.tableAlias &&
            column.name == other.name
        ) as any;
    }
    export function assertHasColumn (columnCollection : ColumnCollection, column : AnyColumn) {
        if (!ColumnCollectionUtil.hasColumn(columnCollection, column)) {
            throw new Error(`Column ${column.tableAlias}.${column.name} does not exist in column collection`);
        }
    }
    export function assertHasColumns (columnCollection : ColumnCollection, arr : AnyColumn[]) {
        for (let i of arr) {
            assertHasColumn(columnCollection, i);
        }
    }
    export type HasColumns<
        ColumnCollectionT extends ColumnCollection,
        ColumnT extends Tuple<AnyColumn>
    > = (
        {
            [index in TupleKeys<ColumnT>] : (
                ColumnT[index] extends AnyColumn ?
                    HasColumn<ColumnCollectionT, ColumnT[index]> :
                    never
            )
        }[TupleKeys<ColumnT>]
    );

    export type ToNullable<
        ColumnCollectionT extends ColumnCollection,
    > = (
        {
            readonly [columnName in Extract<keyof ColumnCollectionT, string>] : ColumnUtil.ToNullable<ColumnCollectionT[columnName]>
        }
    );
    export function toNullable<
        ColumnCollectionT extends ColumnCollection,
    > (columnCollection : ColumnCollectionT) : (
        ToNullable<ColumnCollectionT>
    ) {
        const result = {} as any;
        for (let columnName in columnCollection) {
            if (!columnCollection.hasOwnProperty(columnName)) {
                continue;
            }
            const column = columnCollection[columnName];
            if (!(column instanceof Column)) {
                continue;
            }
            result[columnName] = ColumnUtil.toNullable(column);
        }
        return result;
    }

    //A is replaceable by B if
    //A's column names are subset of B's
    //For each column, A's types are assignable to B's
    export type IsReplaceableBy<
        ColumnCollectionA extends ColumnCollection,
        ColumnCollectionB extends ColumnCollection
    > = (
        keyof ColumnCollectionA extends keyof ColumnCollectionB ?
            (
                //Can't do run-time check for assert delegate assignability...
                {
                    [columnName in Extract<keyof ColumnCollectionA, string>] : (
                        ReturnType<ColumnCollectionA[columnName]["assertDelegate"]> extends
                        ReturnType<ColumnCollectionB[columnName]["assertDelegate"]> ?
                            true :
                            false
                    )
                }[Extract<keyof ColumnCollectionA, string>]
            ) :
            false
    );
    export function isReplaceableBy<
        ColumnCollectionA extends ColumnCollection,
        ColumnCollectionB extends ColumnCollection
    > (
        columnsA : ColumnCollectionA,
        columnsB : ColumnCollectionB
    ) : IsReplaceableBy<
        ColumnCollectionA,
        ColumnCollectionB
    > {
        const aKeys = Object.keys(columnsA);
        const bKeys = Object.keys(columnsB);
        for (let a of aKeys) {
            if (bKeys.indexOf(a) < 0) {
                return false as any;
            }
        }
        return true as any;
    }

    export type WithTableAlias<
        ColumnCollectionT extends ColumnCollection,
        NewTableAliasT extends string
    > = (
        {
            readonly [columnName in keyof ColumnCollectionT] : ColumnUtil.WithTableAlias<
                ColumnCollectionT[columnName],
                NewTableAliasT
            >
        }
    );
    export function withTableAlias<
        ColumnCollectionT extends ColumnCollection,
        NewTableAliasT extends string
    > (
        columnCollection : ColumnCollectionT,
        newTableAlias : NewTableAliasT
    ) : WithTableAlias<ColumnCollectionT, NewTableAliasT> {
        const result = {} as any;
        for (let columnName in columnCollection) {
            result[columnName] = ColumnUtil.withTableAlias(
                columnCollection[columnName],
                newTableAlias
            );
        }
        return result;
    };
    export type ReplaceColumnType<
        ColumnCollectionT extends ColumnCollection,
        TableAliasT extends string,
        ColumnNameT extends string,
        NewTypeT
    > = (
        {
            readonly [columnName in keyof ColumnCollectionT] : (
                ColumnCollectionT[columnName] extends Column<TableAliasT, ColumnNameT, any> ?
                    ColumnUtil.WithType<ColumnCollectionT[columnName], NewTypeT> :
                    ColumnCollectionT[columnName]
            )
        }
    );
    export function replaceColumnType<
        ColumnCollectionT extends ColumnCollection,
        TableAliasT extends string,
        ColumnNameT extends string,
        NewTypeT
    > (
        columns : ColumnCollectionT,
        tableAlias : TableAliasT,
        columnName : ColumnNameT,
        assertDelegate : sd.AssertDelegate<NewTypeT>
    ) : (
        ReplaceColumnType<
            ColumnCollectionT,
            TableAliasT,
            ColumnNameT,
            NewTypeT
        >
    ) {
        if (!columns.hasOwnProperty(columnName)) {
            //No change
            return columns as any;
        }
        const column = columns[columnName];
        if (column.tableAlias != tableAlias) {
            //No change
            return columns as any;
        }
        return spread(
            columns,
            {
                [columnName] : ColumnUtil.withType(column, assertDelegate)
            }
        ) as any;
    }



    export type AndType<
        ColumnCollectionA extends ColumnCollection,
        ColumnCollectionB extends ColumnCollection
    > = (
        {
            readonly [columnName in Extract<keyof ColumnCollectionA, string>] : (
                columnName extends keyof ColumnCollectionB ?
                    (
                        Column<
                            ColumnCollectionA[columnName]["tableAlias"],
                            ColumnCollectionA[columnName]["name"],
                            (
                                ReturnType<ColumnCollectionA[columnName]["assertDelegate"]> &
                                ReturnType<ColumnCollectionB[columnName]["assertDelegate"]>
                            )
                        >
                    ) :
                    (
                        ColumnCollectionA[columnName]
                    )
            )
        }
    )
    export function andType<
        ColumnCollectionA extends ColumnCollection,
        ColumnCollectionB extends ColumnCollection
    > (
        columnsA : ColumnCollectionA,
        columnsB : ColumnCollectionB
    ) : (
        AndType<
            ColumnCollectionA,
            ColumnCollectionB
        >
    ) {
        const result = {} as any;
        for (let columnName in columnsA) {
            const columnA = columnsA[columnName];
            const columnB = columnsB[columnName];
            if (columnB == undefined) {
                result[columnName] = columnA;
            } else {
                result[columnName] = new Column(
                    columnA.tableAlias,
                    columnA.name,
                    sd.and(
                        columnA.assertDelegate,
                        columnB.assertDelegate
                    ),
                    //TODO Check if correct
                    columnA.subTableName,
                    columnA.isSelectReference
                );
            }
        }
        return result;
    }
    export type Merge<
        ColumnCollectionA extends ColumnCollection,
        ColumnCollectionB extends ColumnCollection
    > = (
        AndType<
            ColumnCollectionA,
            ColumnCollectionB
        > &
        ColumnCollectionB
    );
    export function merge<
        ColumnCollectionA extends ColumnCollection,
        ColumnCollectionB extends ColumnCollection
    > (
        columnsA : ColumnCollectionA,
        columnsB : ColumnCollectionB
    ) : Merge<ColumnCollectionA, ColumnCollectionB> {
        return spread(
            columnsB,
            andType(columnsA, columnsB)
        ) as any;
    }


    export type NullableColumnNames<ColumnCollectionT extends ColumnCollection> = (
        {
            [name in Extract<keyof ColumnCollectionT, string>]: (
                null extends ReturnType<ColumnCollectionT[name]["assertDelegate"]> ?
                    name :
                    never
                );
        }[Extract<keyof ColumnCollectionT, string>]
    );
    export type ColumnNames<ColumnCollectionT extends ColumnCollection> = (
        Extract<keyof ColumnCollectionT, string>
    );
    export function nullableColumnNames<ColumnCollectionT extends ColumnCollection> (
        columnCollection : ColumnCollectionT
    ) : NullableColumnNames<ColumnCollectionT>[] {
        const result : string[] = [];
        for (let name in columnCollection) {
            if (columnCollection.hasOwnProperty(name)) {
                try {
                    columnCollection[name].assertDelegate("test-null", null);
                    result.push(name);
                } catch (_err) {
                    //Do nothing
                }
            }
        }
        return result as any;
    }
    export function columnNames<ColumnCollectionT extends ColumnCollection> (
        columnCollection : ColumnCollectionT
    ) : ColumnNames<ColumnCollectionT>[] {
        const result : string[] = [];
        for (let name in columnCollection) {
            if (columnCollection.hasOwnProperty(name)) {
                result.push(name);
            }
        }
        return result as any;
    }

    export type Type<ColumnCollectionT extends ColumnCollection> = (
        /*{
            [columnName in Extract<keyof ColumnCollectionT, string>] : (
                ReturnType<ColumnCollectionT[columnName]["assertDelegate"]>
            )
        }*/
        {
            [columnName in keyof ColumnCollectionT] : (
                ColumnCollectionT[columnName] extends AnyColumn ?
                    ReturnType<ColumnCollectionT[columnName]["assertDelegate"]> :
                    never
            )
        }
    );
    export function assertDelegate<ColumnCollectionT extends ColumnCollection> (
        columnCollection : ColumnCollectionT,
        useColumnNames? : string[]
    ) : (
        sd.AssertDelegate<Type<ColumnCollectionT>>
    ) {
        return sd.schema(
            ...Object.keys(columnCollection)
                .filter((columnName) => {
                    return (useColumnNames == undefined) ?
                        //Use all columns
                        true :
                        //Use only specified columns
                        useColumnNames.indexOf(columnName) >= 0;
                })
                .map((columnName) => {
                    const column = columnCollection[columnName];
                    return sd.field(column.name, column.assertDelegate)
                })
        ) as any;
    }
    export function partialAssertDelegate<ColumnCollectionT extends ColumnCollection> (
        columnCollection : ColumnCollectionT,
        useColumnNames? : string[]
    ) : (
        sd.AssertDelegate<Partial<Type<ColumnCollectionT>>>
    ) {
        return sd.schema(
            ...Object.keys(columnCollection)
                .filter((columnName) => {
                    return (useColumnNames == undefined) ?
                        //Use all columns
                        true :
                        //Use only specified columns
                        useColumnNames.indexOf(columnName) >= 0;
                })
                .map((columnName) => {
                    const column = columnCollection[columnName];
                    return sd.field(column.name, sd.optional(column.assertDelegate))
                })
        ) as any;
    }
    export function allNullAssertDelegate<ColumnCollectionT extends ColumnCollection> (
        columnCollection : ColumnCollectionT,
        useColumnNames : string[]
    ) : (
        sd.AssertDelegate<{
            [columnName in Extract<keyof ColumnCollectionT, string>] : (
                null
            )
        }>
    ) {
        return sd.schema(
            ...Object.keys(columnCollection)
                .filter((columnName) => {
                    return useColumnNames.indexOf(columnName) >= 0;
                })
                .map((columnName) => {
                    const column = columnCollection[columnName];
                    return sd.field(column.name, sd.nil())
                })
        ) as any;
    }
    export type ToColumnReferences<ColumnCollectionT extends ColumnCollection> = ({
        readonly [tableAlias in ColumnCollectionT[
            keyof ColumnCollectionT
        ]["tableAlias"]] : ColumnCollectionT
    });
    export function toColumnReferences<ColumnCollectionT extends ColumnCollection> (
        columnCollection : ColumnCollectionT
    ) {
        const keys = Object.keys(columnCollection);
        if (keys.length == 0) {
            //TODO add this check in appendSelect()
            throw new Error(`Empty column collection found`);
        }
        const firstColumn = (columnCollection as any)[keys[0]];
        return {
            [firstColumn.tableAlias] : keys.reduce((memo, columnName) => {
                const column = (columnCollection as any)[columnName];
                memo[columnName] = new Column(
                    column.tableAlias,
                    column.name,
                    column.assertDelegate,
                    undefined,
                    true
                );
                return memo;
            }, {} as any)
        } as any;
    }
}