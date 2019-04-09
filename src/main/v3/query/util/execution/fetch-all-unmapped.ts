import {AfterSelectClause, MainQuery} from "../predicate";
import {IConnection, Types} from "../../../execution";
import {UnmappedType} from "../operation";
import {queryTree} from "../query";
import {QueryTreeUtil} from "../../../query-tree";
import {SEPARATOR} from "../../../constants";
import {SelectItemArrayUtil} from "../../../select-item-array";
import {ColumnRefUtil, ColumnRef} from "../../../column-ref";
import {DateTimeUtil} from "../../../data-type";

export type FetchAllUnmapped<
    QueryT extends AfterSelectClause & MainQuery
> = (
    UnmappedType<QueryT>[]
);
export async function fetchAllUnmapped<
    QueryT extends AfterSelectClause & MainQuery
>(
    query : QueryT,
    connection : IConnection
) : Promise<FetchAllUnmapped<QueryT>> {
    const sql = QueryTreeUtil.toSql(queryTree(query));
    const rawResult = await connection.select(sql);

    const hasDuplicateColumnName = SelectItemArrayUtil
        .hasDuplicateColumnName(
            query._selects
        );
    const hasNullableJoins = (query._joins == undefined) ?
        false :
        query._joins.some(j => j.nullable);
    const ref : ColumnRef = ColumnRefUtil.fromQuerySelects(query);

    const rows : any[] = [];
    for (let rawRow of rawResult.rows) {
        const row : any = {};
        for (let k of Object.keys(rawRow)) {
            const parts = k.split(SEPARATOR);
            const tableAlias = parts[0];
            const columnName = parts[1];

            switch (rawResult.fields[k].type) {
                case Types.DATETIME:
                case Types.DATETIME2:
                case Types.TIMESTAMP:
                case Types.TIMESTAMP2: {
                    if (rawRow[k] === null) {
                        //The value is allowed to be `null`
                        break;
                    }
                    rawRow[k] = DateTimeUtil.fromSqlUtc(
                        rawRow[k],
                        rawResult.fields[k].decimals as 0|1|2|3
                    );
                    break;
                }
                case Types.LONGLONG: {
                    if (rawRow[k] === null) {
                        //The value is allowed to be `null`
                        break;
                    }
                    if (typeof rawRow[k] === "string") {
                        //We try to convert it to `number` first.
                        //Then, bigint.
                        const n = parseInt(rawRow[k])
                        if (n.toString() === rawRow[k]) {
                            rawRow[k] = n;
                        } else {
                            rawRow[k] = BigInt(rawRow[k])
                        }
                    }
                    break;
                }
            }
            const value = ref[tableAlias][columnName].assertDelegate(
                `${tableAlias}.${columnName}`,
                rawRow[k]
            );
            if (hasDuplicateColumnName || hasNullableJoins) {
                let table = row[tableAlias];
                if (table == undefined) {
                    table = {};
                    row[tableAlias] = table;
                }
                table[columnName] = value;
            } else {
                row[columnName] = value;
            }
        }
        if (hasNullableJoins) {
            for (let tableAlias in row) {
                if (
                    query._joins != undefined &&
                    query._joins.findIndex(
                        j => j.aliasedTable.alias == tableAlias
                    ) < 0
                ) {
                    //Probably `__aliased`
                    continue;
                }
                const map = row[tableAlias];
                const allNull = Object.keys(map)
                    .every(columnName => map[columnName] === null);
                if (allNull) {
                    row[tableAlias] = undefined;
                }
            }
        }
        rows.push(row);
    }
    return rows;
}
