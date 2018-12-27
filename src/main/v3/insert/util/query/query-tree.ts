import {escapeId} from "sqlstring";
import {ITable, TableUtil} from "../../../table";
import {IInsert, InsertRow, InsertModifier} from "../../insert";
import {QueryTree, QueryTreeArray} from "../../../query-tree";
import {RawExprUtil} from "../../../raw-expr";

export function queryTreeRow (
    insert : IInsert,
    row : InsertRow<ITable>
) : QueryTreeArray {
    const columnNames = Object.keys(insert._table.columns).sort();

    const result : QueryTreeArray = [];
    for (let columnName of columnNames) {
        if (result.length > 0) {
            result.push(",");
        }
        const value = (row as any)[columnName];
        if (value === undefined) {
            if (TableUtil.isOptional(insert._table, columnName)) {
                result.push("DEFAULT");
            } else {
                throw new Error(`Expected a value for ${insert._table.alias}.${columnName}; received undefined`);
            }
        } else {
            result.push(RawExprUtil.queryTree(value));
        }
    }
    return [
        "(",
        result,
        ")"
    ];
}
export function queryTreeValues (
    insert : IInsert & { _values : InsertRow<ITable>[] }
) {
    const result : QueryTreeArray = [];
    for (let row of insert._values) {
        if (result.length > 0) {
            result.push(",");
        }
        result.push(queryTreeRow(insert, row));
    }
    return result;
}
export function queryTree (
    insert : IInsert & { _values : InsertRow<ITable>[] }
) : QueryTree {
    const columnNames = Object.keys(insert._table.columns).sort();

    const result : QueryTreeArray = [];
    if (insert._modifier == InsertModifier.IGNORE) {
        result.push("INSERT IGNORE INTO");
    } else if (insert._modifier == InsertModifier.REPLACE) {
        result.push("REPLACE INTO");
    } else {
        result.push("INSERT INTO");
    }
    result.push(escapeId(insert._table.alias));

    result.push("(");
    for (let columnName of columnNames) {
        result.push(escapeId(columnName));
    }
    result.push(")");

    result.push("VALUES");
    result.push(queryTreeValues(insert));

    return result;
}