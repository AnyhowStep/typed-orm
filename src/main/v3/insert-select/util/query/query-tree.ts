import * as sd from "type-mapping";
import {escapeId} from "sqlstring";
import {TableUtil} from "../../../table";
import {ExecutableInsertSelect, InsertSelectModifier} from "../../insert-select";
import {QueryTreeArray} from "../../../query-tree";
import {RawExprUtil} from "../../../raw-expr";
import {QueryUtil} from "../../../query";
import {PrimitiveExprUtil} from "../../../primitive-expr";
import {isColumn} from "../../../column/util";
import {SEPARATOR} from "../../../constants";

export function queryTree_Row (
    columnNames : string[],
    insert : ExecutableInsertSelect
) : QueryTreeArray {
    const result : QueryTreeArray = [];
    for (let columnName of columnNames) {
        const expr = (insert._row as any)[columnName];
        if (result.length > 0) {
            result.push(",");
        }
        if (PrimitiveExprUtil.isPrimitiveExpr(expr)) {
            result.push(RawExprUtil.queryTree(expr));
        } else if (isColumn(expr)) {
            result.push(escapeId("src"));
            result.push(".");
            result.push(escapeId(`${expr.tableAlias}${SEPARATOR}${expr.name}`));
        } else {
            throw new Error(`Unknown INSERT ... SELECT value, ${sd.TypeUtil.toTypeStr(expr)}`);
        }
    }
    return result;
}

export function queryTree (
    insert : ExecutableInsertSelect
) : QueryTreeArray {
    const columnNames = Object.keys(insert._table.columns).sort()
        .filter(columnName => insert._table.generated.indexOf(columnName) < 0)
        .filter(columnName => {
            if ((insert._row as any)[columnName] !== undefined) {
                return true;
            }
            if (TableUtil.isRequired(insert._table, columnName)) {
                throw new Error(`A value for ${insert._table.alias}.${columnName} is required`);
            }
            return false;
        });


    const result : QueryTreeArray = [];
    if (insert._modifier == InsertSelectModifier.IGNORE) {
        result.push("INSERT IGNORE INTO");
    } else if (insert._modifier == InsertSelectModifier.REPLACE) {
        result.push("REPLACE INTO");
    } else {
        result.push("INSERT INTO");
    }
    result.push(escapeId(insert._table.alias));

    result.push("(");
    result.push(columnNames
        .map(columnName => escapeId(columnName))
        .join(",")
    );
    result.push(")");

    result.push("SELECT");

    result.push(queryTree_Row(columnNames, insert));

    result.push("FROM");
    result.push("(");
    result.push(QueryUtil.queryTree(insert._query));
    result.push(")");
    result.push("AS");
    result.push(escapeId("src"));

    return result;
}