import * as sd from "schema-decorator";
import {escapeId} from "sqlstring";
import {ITable, TableUtil} from "../../../table";
import {IInsertSelect, InsertSelectRow, InsertSelectModifier} from "../../insert-select";
import {QueryTree, QueryTreeArray} from "../../../query-tree";
import {RawExprUtil} from "../../../raw-expr";
import {QueryUtil} from "../../../query";
import {isPrimitiveExpr} from "../../../primitive-expr";
import {isColumn} from "../../../column/util";
import {SEPARATOR} from "../../../constants";

//TODO-REFACTOR
export function queryTree (
    insert : (
        IInsertSelect &
        {
            _row : InsertSelectRow<QueryUtil.AfterSelectClause, ITable>
        }
    )
) : QueryTree {
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

    result.push(columnNames
        .map((columnName, index) => {
            const expr = (insert._row as any)[columnName];
            const innerResult : QueryTreeArray = (index == 0) ?
                [] :
                [","];
            if (isPrimitiveExpr(expr)) {
                innerResult.push(RawExprUtil.queryTree(expr));
            } else if (isColumn(expr)) {
                innerResult.push(escapeId("src"));
                innerResult.push(".");
                innerResult.push(escapeId(`${expr.tableAlias}${SEPARATOR}${expr.name}`));
            } else {
                throw new Error(`Unknown INSERT ... SELECT value, ${sd.toTypeStr(expr)}`);
            }
            return innerResult;
        })
    );

    result.push("FROM");
    result.push("(");
    result.push(QueryUtil.queryTree(insert._query));
    result.push(")");
    result.push("AS");
    result.push(escapeId("src"));

    return result;
}