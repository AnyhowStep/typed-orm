import * as sd from "type-mapping";
import {ITable} from "../../../table";
import {ColumnNames, uniqueColumnNames} from "./column-names";
import {ColumnType} from "./column-type";
import {getColumnsWithName} from "./get-columns-with-name";

export type TypeMap<TableT extends ITable> = (
    {
        [columnName in ColumnNames<TableT>] : (
            ColumnType<TableT, columnName>
        )
    }
);
export function assertDelegate<TableT extends ITable> (
    table : TableT
) : sd.SafeMapper<TypeMap<TableT>> {
    const assertMap : any = {};
    for (let columnName of uniqueColumnNames(table)) {
        const columns = getColumnsWithName(table, columnName);
        if (columns.length == 0) {
            throw new Error(`No columns found for ${table.alias}.${columnName}`);
        }
        assertMap[columnName] = sd.unsafeDeepMerge(
            ...columns.map(c => c.assertDelegate)
        );
    }
    return sd.objectFromMap(assertMap) as any;
}