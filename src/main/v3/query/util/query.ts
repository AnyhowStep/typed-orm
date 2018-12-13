import {IQuery} from "../query";
import {QueryTreeArray} from "../../query-tree";
import {AliasedTable} from "../../aliased-table";
import {ColumnUtil} from "../../column";
import {AfterSelectClause} from "./predicate";
import {ExprSelectItemUtil} from "../../expr-select-item";
import {ColumnMapUtil} from "../../column-map";

export function queryTreeSelects (query : AfterSelectClause) : QueryTreeArray {
    const selects = query._selects;
    const result : QueryTreeArray = [];
    result.push("SELECT");
    for (let item of selects) {
        if (result.length > 1) {
            result.push(",");
        }
        if (ColumnUtil.isColumn(item)) {
            result.push(ColumnUtil.queryTree(item));
        } else if (ExprSelectItemUtil.isExprSelectItem(item)) {
            result.push(ExprSelectItemUtil.queryTree(item));
        } else if (ColumnMapUtil.isColumnMap(item)) {
            result.push(ColumnMapUtil.queryTree(item));
        }
    }
    return result;
}
export function queryTreeJoins (query : IQuery) : QueryTreeArray {
    const joins = query._joins;
    if (joins == undefined || joins.length == 0) {
        return [];
    }
    const result : QueryTreeArray = [];
    result.push(AliasedTable.queryTree(joins[0].aliasedTable));
    for (let i=1; i<joins.length; ++i) {
        const join = joins[i];
        result.push(`${join.joinType} JOIN`);
        result.push(AliasedTable.queryTree(join.aliasedTable));
        if (join.from.length == 0) {
            continue;
        }
        result.push("ON");
        result.push(join.from
            .map((from, index) => {
                const to = join.to[index];
                return [
                    ColumnUtil.queryTree(to),
                    "=",
                    ColumnUtil.queryTree(from),
                ].join(" ");
            })
            .join(" AND ")
        );
    }

    return result;
}
export function queryTreeWhere (query : IQuery) : QueryTreeArray {
    const where = query._where;
    if (where == undefined) {
        return [];
    } else {
        return ["WHERE", where.queryTree];
    }
}