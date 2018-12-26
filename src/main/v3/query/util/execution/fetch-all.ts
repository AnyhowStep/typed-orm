import {AfterSelectClause} from "../predicate";
import {IConnection, Types} from "../../../execution";
import {MappedType} from "../operation";
import {queryTree} from "../query";
import {QueryTreeUtil} from "../../../query-tree";
import {SEPARATOR} from "../../../constants";
import {SelectItemArrayUtil} from "../../../select-item-array";
import {ColumnRefUtil, ColumnRef} from "../../../column-ref";
import { DateTimeUtil } from "../../../data-type";

export type FetchAll<
    QueryT extends AfterSelectClause
> = (
    MappedType<QueryT>[]
);
export async function fetchAll<
    QueryT extends AfterSelectClause
>(
    query : QueryT,
    connection : IConnection
) : Promise<FetchAll<QueryT>> {
    SelectItemArrayUtil.assertNoDuplicateColumnName
    const sql = QueryTreeUtil.toSqlPretty(queryTree(query));
    const rawResult = await connection.select(sql);

    const hasDuplicateColumnName = SelectItemArrayUtil
        .hasDuplicateColumnName(
            query._selects
        );
    const ref : ColumnRef = ColumnRefUtil.fromQuerySelects(query);

    const rows : any[] = [];
    for (let rawRow of rawResult.rows) {
        const originalRow : any = {};
        for (let k of Object.keys(rawRow)) {
            const parts = k.split(SEPARATOR);
            const tableAlias = parts[0];
            const columnName = parts[1];

            switch (rawResult.fields[k].type) {
                case Types.DATETIME:
                case Types.DATETIME2:
                case Types.TIMESTAMP:
                case Types.TIMESTAMP2: {
                    rawRow[k] = DateTimeUtil.fromSqlUtc(
                        rawRow[k],
                        rawResult.fields[k].decimals as 0|1|2|3
                    );
                    break;
                }
            }
            const value = ref[tableAlias][columnName].assertDelegate(
                `${tableAlias}.${columnName}`,
                rawRow[k]
            );
            if (hasDuplicateColumnName) {
                let table = originalRow[tableAlias];
                if (table == undefined) {
                    table = {};
                    originalRow[tableAlias] = table;
                }
                table[columnName] = value;
            } else {
                originalRow[columnName] = value;
            }
        }
        const row = (query._mapDelegate == undefined) ?
            originalRow :
            await query._mapDelegate(originalRow, originalRow);

        rows.push(row);
    }
    return rows;
}
