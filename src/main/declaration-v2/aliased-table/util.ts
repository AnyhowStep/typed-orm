import {AliasedTable, AnyAliasedTable} from "./aliased-table";
import {Column, AnyColumn} from "../column";
import {ColumnCollectionUtil} from "../column-collection";

export namespace AliasedTableUtil {
    export function convenientFullName (table : AnyAliasedTable) : string {
        if ((table.alias as string) == (table.name as string)) {
            return table.alias;
        } else {
            return `${table.name} AS ${table.alias}`
        }
    }
    export function assertHasColumn (table : AnyAliasedTable, column : AnyColumn) {
        if (!ColumnCollectionUtil.hasColumn(table.columns, column)) {
            throw new Error(`Column ${column.tableAlias}.${column.name} does not exist in table ${convenientFullName(table)}`);
        }
    }
    export function assertHasColumns (table : AnyAliasedTable, arr : AnyColumn[]) {
        for (let i of arr) {
            assertHasColumn(table, i);
        }
    }

    
    export type IsReplaceableBy<
        TableA extends AnyAliasedTable,
        TableB extends AnyAliasedTable
    > = (
        ColumnCollectionUtil.IsReplaceableBy<TableA["columns"], TableB["columns"]>
    )
    export function isReplaceableBy<
        TableA extends AnyAliasedTable,
        TableB extends AnyAliasedTable
    > (
        tableA : TableA,
        tableB : TableB
    ) : IsReplaceableBy<
        TableA,
        TableB
    > {
        return ColumnCollectionUtil.isReplaceableBy(tableA.columns, tableB.columns) as any;
    }

    export type As<
        TableT extends AnyAliasedTable,
        NewAliasT extends string
    > = (
        AliasedTable<
            NewAliasT,
            TableT["name"],
            ColumnCollectionUtil.WithTableAlias<TableT["columns"], NewAliasT>
        >
    );
    export function as<
        TableT extends AnyAliasedTable,
        NewAliasT extends string
    > (table : TableT, newAlias : NewAliasT) : (
        As<TableT, NewAliasT>
    ) {
        return new AliasedTable(
            newAlias,
            table.name,
            ColumnCollectionUtil.withTableAlias(table.columns, newAlias)
        ) as any;
    }

    export type ToGeneric<TableT extends AnyAliasedTable> = (
        AliasedTable<
            any,
            any,
            {
                [columnName in Extract<keyof TableT["columns"], string>] : (
                    Column<any, columnName, ReturnType<TableT["columns"][columnName]["assertDelegate"]>>
                )
            }
        >
    );
}
