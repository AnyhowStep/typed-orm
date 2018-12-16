import {IQuery} from "../query";
import {QueryTreeArray} from "../../query-tree";
import {AliasedTable} from "../../aliased-table";
import {IColumn, ColumnUtil} from "../../column";
import {AfterSelectClause} from "./predicate";
import {ExprSelectItemUtil} from "../../expr-select-item";
import {ColumnMap, ColumnMapUtil} from "../../column-map";
import {SEPARATOR} from "../../constants";
import {escapeId} from "sqlstring";
import {ColumnIdentifierRefUtil} from "../../column-identifier-ref";

function queryTreeSelectItem_Column (column : IColumn) : QueryTreeArray {
    const result : QueryTreeArray = [];
    result.push(ColumnUtil.queryTree(column));
    result.push("AS");
    result.push(escapeId(`${column.tableAlias}${SEPARATOR}${column.name}`));
    return result;
}
function queryTreeSelectItem_ColumnMap (columnMap : ColumnMap) : QueryTreeArray {
    const result : QueryTreeArray = [];
    for (let column of ColumnMapUtil.getSortedColumnArray(columnMap)) {
        if (result.length > 0) {
            result.push(",");
        }
        result.push(queryTreeSelectItem_Column(column));
    }
    return result;
}

export function queryTreeSelects (query : AfterSelectClause) : QueryTreeArray {
    const selects = query._selects;
    const result : QueryTreeArray = [];
    for (let item of selects) {
        if (result.length > 0) {
            result.push(",");
        }
        if (ColumnUtil.isColumn(item)) {
            result.push(queryTreeSelectItem_Column(item));
        } else if (ExprSelectItemUtil.isExprSelectItem(item)) {
            result.push(ExprSelectItemUtil.queryTree(item));
        } else if (ColumnMapUtil.isColumnMap(item)) {
            result.push(queryTreeSelectItem_ColumnMap(item));
        }
    }
    return ["SELECT", result];
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
export function queryTreeGroupBy (query : IQuery) : QueryTreeArray {
    const grouped = query._grouped;
    if (grouped == undefined) {
        return [];
    }
    const selectsRef = ColumnIdentifierRefUtil.fromSelectItemArray(
        query._selects == undefined ?
        [] :
        query._selects
    );

    const result : QueryTreeArray = [];
    for (let item of grouped) {
        if (result.length > 0) {
            result.push(",");
        }
        if (ColumnIdentifierRefUtil.hasColumnIdentifier(selectsRef, item)) {
            result.push(escapeId(`${item.tableAlias}${SEPARATOR}${item.name}`));
        } else {
            //Probably from a JOIN'd table
            result.push(escapeId(item.tableAlias));
            result.push(".");
            result.push(escapeId(item.name));
        }
    }
    return ["GROUP BY", result];
}
export function queryTreeHaving (query : IQuery) : QueryTreeArray {
    const having = query._having;
    if (having == undefined) {
        return [];
    } else {
        return ["HAVING", having.queryTree];
    }
}