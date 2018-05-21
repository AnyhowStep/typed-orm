import {AnyAliasedTable} from "./aliased-table";
import {AnyColumn} from "../column";
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
}
