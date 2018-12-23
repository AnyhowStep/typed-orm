import * as sd from "schema-decorator";
import {IQuery} from "../query";
import {QueryTreeArray, QueryTree, Parentheses} from "../../query-tree";
import {AliasedTable} from "../../aliased-table";
import {IColumn, ColumnUtil} from "../../column";
import {AfterSelectClause, BeforeSelectClause, OneSelectItemQuery, OneRowQuery, isOneRowQuery, ZeroOrOneRowQuery} from "./predicate";
import {ExprSelectItemUtil} from "../../expr-select-item";
import {ColumnMap, ColumnMapUtil} from "../../column-map";
import {SEPARATOR} from "../../constants";
import {escapeId} from "sqlstring";
import {ColumnIdentifierRefUtil} from "../../column-identifier-ref";
import {ExprUtil} from "../../expr";
import {RawExprUtil} from "../../raw-expr";
import {ColumnRef, ColumnRefUtil} from "../../column-ref";
import {SelectItemUtil} from "../../select-item";

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
function queryTreeSelectItem_ColumnRef (columnRef : ColumnRef) : QueryTreeArray {
    const result : QueryTreeArray = [];
    for (let column of ColumnRefUtil.getSortedColumnArray(columnRef)) {
        if (result.length > 0) {
            result.push(",");
        }
        result.push(queryTreeSelectItem_Column(column));
    }
    return result;
}


function queryTreeSelectItem_As_Column (column : IColumn) : QueryTree {
    return ColumnUtil.queryTree(column);
}
function queryTreeSelectItem_As_ColumnMap (columnMap : ColumnMap) : QueryTreeArray {
    const result : QueryTreeArray = [];
    for (let column of ColumnMapUtil.getSortedColumnArray(columnMap)) {
        if (result.length > 0) {
            result.push(",");
        }
        result.push(queryTreeSelectItem_As_Column(column));
    }
    return result;
}
function queryTreeSelectItem_As_ColumnRef (columnRef : ColumnRef) : QueryTreeArray {
    const result : QueryTreeArray = [];
    for (let column of ColumnRefUtil.getSortedColumnArray(columnRef)) {
        if (result.length > 0) {
            result.push(",");
        }
        result.push(queryTreeSelectItem_As_Column(column));
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
        } else if (ColumnRefUtil.isColumnRef(item)) {
            result.push(queryTreeSelectItem_ColumnRef(item));
        } else {
            throw new Error(`Unknown select item`);
        }
    }
    return [
        "SELECT",
        (query._distinct ? "DISTINCT" : ""),
        (query._sqlCalcFoundRows ? "SQL_CALC_FOUND_ROWS" : ""),
        result
    ];
}
export function queryTreeSelects_RawExpr (query : OneSelectItemQuery<any>) : QueryTreeArray {
    let result : QueryTree|undefined = undefined;
    const item = query._selects[0];
    if (ColumnUtil.isColumn(item)) {
        result = ColumnUtil.queryTree(item);
    } else if (ExprSelectItemUtil.isExprSelectItem(item)) {
        result = item.unaliasedQuery;
    } else {
        throw new Error(`Unknown select item`);
    }
    return [
        "SELECT",
        (query._distinct ? "DISTINCT" : ""),
        (query._sqlCalcFoundRows ? "SQL_CALC_FOUND_ROWS" : ""),
        result
    ];
}
export function queryTreeSelects_As (query : AfterSelectClause) : QueryTreeArray {
    const selects = query._selects;
    const result : QueryTreeArray = [];
    for (let item of selects) {
        if (result.length > 0) {
            result.push(",");
        }
        if (ColumnUtil.isColumn(item)) {
            result.push(queryTreeSelectItem_As_Column(item));
        } else if (ExprSelectItemUtil.isExprSelectItem(item)) {
            result.push(Parentheses.Create(item.unaliasedQuery));
            result.push("AS");
            result.push(escapeId(item.alias));
        } else if (ColumnMapUtil.isColumnMap(item)) {
            result.push(queryTreeSelectItem_As_ColumnMap(item));
        } else if (ColumnRefUtil.isColumnRef(item)) {
            result.push(queryTreeSelectItem_As_ColumnRef(item));
        } else {
            throw new Error(`Unknown select item`);
        }
    }
    return [
        "SELECT",
        (query._distinct ? "DISTINCT" : ""),
        (query._sqlCalcFoundRows ? "SQL_CALC_FOUND_ROWS" : ""),
        result
    ];
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
export function queryTreeFrom (query : IQuery) : QueryTreeArray {
    const result = queryTreeJoins(query);
    if (result.length == 0) {
        return result;
    } else {
        return ["FROM", result];
    }
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
export function queryTreeOrderBy (query : IQuery) : QueryTreeArray {
    const orders = query._orders;
    if (orders == undefined) {
        return [];
    }
    const result : QueryTreeArray = [];
    for (let order of orders) {
        if (result.length > 0) {
            result.push(",");
        }
        const orderExpr = order[0];
        if (ColumnUtil.isColumn(orderExpr)) {
            result.push(ColumnUtil.queryTree(orderExpr));
        } else if (ExprUtil.isExpr(orderExpr)) {
            result.push(orderExpr.queryTree);
        } else {
            throw new Error(`Unknown OrderExpr`);
        }

        result.push(order[1]);
    }
    return ["ORDER BY", result];
}
/*
    The syntax is one of:

    + LIMIT maxRowCount
    + LIMIT maxRowCount OFFSET offset

    And,
    `LIMIT maxRowCount` is a synonym of
    `LIMIT maxRowCount OFFSET 0`
*/
export function queryTreeLimit (query : IQuery) : QueryTreeArray {
    const limit = query._limit;
    if (limit == undefined) {
        return [];
    }
    if (limit.offset == 0) {
        return ["LIMIT", RawExprUtil.queryTree(limit.maxRowCount)];
    } else {
        return [
            "LIMIT", RawExprUtil.queryTree(limit.maxRowCount),
            "OFFSET", RawExprUtil.queryTree(limit.offset),
        ];
    }
}

export function queryTree_RawExpr (query : OneSelectItemQuery<any>) : QueryTreeArray {
    if (
        query._unions != undefined ||
        query._unionOrders != undefined ||
        query._unionLimit != undefined
    ) {
        return [
            "(",
            "(",
            queryTreeSelects_RawExpr(query),
            queryTreeFrom(query),
            queryTreeWhere(query),
            queryTreeGroupBy(query),
            queryTreeHaving(query),
            queryTreeOrderBy(query),
            queryTreeLimit(query),
            ")",
            queryTreeUnion(query),
            queryTreeUnionOrderBy(query),
            queryTreeUnionLimit(query),
            ")",
        ];
    } else {
        //No UNION-related clauses
        return [
            "(",
            queryTreeSelects_RawExpr(query),
            queryTreeFrom(query),
            queryTreeWhere(query),
            queryTreeGroupBy(query),
            queryTreeHaving(query),
            queryTreeOrderBy(query),
            queryTreeLimit(query),
            ")",
        ];
    }
}
export function queryTree_As (query : AfterSelectClause) : QueryTree {
    if (
        query._unions != undefined ||
        query._unionOrders != undefined ||
        query._unionLimit != undefined
    ) {
        return Parentheses.Create([
            "(",
            queryTreeSelects_As(query),
            queryTreeFrom(query),
            queryTreeWhere(query),
            queryTreeGroupBy(query),
            queryTreeHaving(query),
            queryTreeOrderBy(query),
            queryTreeLimit(query),
            ")",
            queryTreeUnion(query),
            queryTreeUnionOrderBy(query),
            queryTreeUnionLimit(query),
        ]);
    } else {
        //No UNION-related clauses
        return Parentheses.Create([
            queryTreeSelects_As(query),
            queryTreeFrom(query),
            queryTreeWhere(query),
            queryTreeGroupBy(query),
            queryTreeHaving(query),
            queryTreeOrderBy(query),
            queryTreeLimit(query),
        ]);
    }
}
export function queryTree_SelectStar (query : BeforeSelectClause) : QueryTree {
    if (
        query._unions != undefined ||
        query._unionOrders != undefined ||
        query._unionLimit != undefined
    ) {
        return Parentheses.Create([
            "(",
            "SELECT *",
            queryTreeFrom(query),
            queryTreeWhere(query),
            queryTreeGroupBy(query),
            queryTreeHaving(query),
            queryTreeOrderBy(query),
            queryTreeLimit(query),
            ")",
            queryTreeUnion(query),
            queryTreeUnionOrderBy(query),
            queryTreeUnionLimit(query),
        ]);
    } else {
        //No UNION-related clauses
        return Parentheses.Create([
            "SELECT *",
            queryTreeFrom(query),
            queryTreeWhere(query),
            queryTreeGroupBy(query),
            queryTreeHaving(query),
            queryTreeOrderBy(query),
            queryTreeLimit(query),
        ]);
    }
}

export function queryTree (query : AfterSelectClause) : QueryTreeArray {
    if (
        query._unions != undefined ||
        query._unionOrders != undefined ||
        query._unionLimit != undefined
    ) {
        return [
            "(",
            queryTreeSelects(query),
            queryTreeFrom(query),
            queryTreeWhere(query),
            queryTreeGroupBy(query),
            queryTreeHaving(query),
            queryTreeOrderBy(query),
            queryTreeLimit(query),
            ")",
            queryTreeUnion(query),
            queryTreeUnionOrderBy(query),
            queryTreeUnionLimit(query),
        ];
    } else {
        //No UNION-related clauses
        return [
            queryTreeSelects(query),
            queryTreeFrom(query),
            queryTreeWhere(query),
            queryTreeGroupBy(query),
            queryTreeHaving(query),
            queryTreeOrderBy(query),
            queryTreeLimit(query),
        ];
    }
}

export function queryTreeUnion (query : IQuery) : QueryTreeArray {
    const unions = query._unions;
    if (unions == undefined) {
        return [];
    }
    const result : QueryTreeArray = [];
    for (let union of unions) {
        result.push("UNION");
        //I think making this explicit is less confusing
        result.push(union.distinct ? "DISTINCT" : "ALL");
        result.push("(");
        result.push(queryTree(union.query))
        result.push(")");
    }
    return result;
}

export function queryTreeUnionOrderBy (query : IQuery) : QueryTreeArray {
    const orders = query._unionOrders;
    if (orders == undefined) {
        return [];
    }
    const result : QueryTreeArray = [];
    for (let order of orders) {
        if (result.length > 0) {
            result.push(",");
        }
        const orderExpr = order[0];
        if (ColumnUtil.isColumn(orderExpr)) {
            result.push(ColumnUtil.queryTree(orderExpr));
        } else if (ExprUtil.isExpr(orderExpr)) {
            result.push(orderExpr.queryTree);
        } else {
            throw new Error(`Unknown OrderExpr`);
        }

        result.push(order[1]);
    }
    return ["ORDER BY", result];
}

/*
    The syntax is one of:

    + LIMIT maxRowCount
    + LIMIT maxRowCount OFFSET offset

    And,
    `LIMIT maxRowCount` is a synonym of
    `LIMIT maxRowCount OFFSET 0`
*/
export function queryTreeUnionLimit (query : IQuery) : QueryTreeArray {
    const limit = query._unionLimit;
    if (limit == undefined) {
        return [];
    }
    if (limit.offset == 0) {
        return ["LIMIT", RawExprUtil.queryTree(limit.maxRowCount)];
    } else {
        return [
            "LIMIT", RawExprUtil.queryTree(limit.maxRowCount),
            "OFFSET", RawExprUtil.queryTree(limit.offset),
        ];
    }
}

export type TypeOf<QueryT extends OneSelectItemQuery<any> & ZeroOrOneRowQuery> = (
    QueryT extends OneRowQuery ?
    SelectItemUtil.TypeOf<QueryT["_selects"][0]> :
    null|SelectItemUtil.TypeOf<QueryT["_selects"][0]>
);
export type AssertDelegate<QueryT extends OneSelectItemQuery<any> & ZeroOrOneRowQuery> = (
    sd.AssertDelegate<TypeOf<QueryT>>
);
export function assertDelegate<
    QueryT extends OneSelectItemQuery<any> & ZeroOrOneRowQuery
> (rawExpr : QueryT) : AssertDelegate<QueryT> {
    if (isOneRowQuery(rawExpr)) {
        return rawExpr._selects[0].assertDelegate as any;
    } else {
        return sd.nullable(rawExpr._selects[0].assertDelegate) as any;
    }
}