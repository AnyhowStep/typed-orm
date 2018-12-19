import {Query} from "../../query";
import {AfterSelectClause} from "../predicate";

export type SqlCalcFoundRows<QueryT extends AfterSelectClause> = (
    Query<{
        readonly _distinct : QueryT["_distinct"];
        readonly _sqlCalcFoundRows : true;

        readonly _joins : QueryT["_joins"],
        readonly _parentJoins : QueryT["_parentJoins"],
        readonly _selects : QueryT["_selects"],
        readonly _where : QueryT["_where"],

        readonly _grouped : QueryT["_grouped"],
        readonly _having : QueryT["_having"],

        readonly _orders : QueryT["_orders"],
        readonly _limit : QueryT["_limit"],

        readonly _unions : QueryT["_unions"],
        readonly _unionOrders : QueryT["_unionOrders"],
        readonly _unionLimit : QueryT["_unionLimit"],

        readonly _mapDelegate : QueryT["_mapDelegate"],
    }>
);
export function sqlCalcFoundRows<QueryT extends AfterSelectClause> (
    query : QueryT
) : SqlCalcFoundRows<QueryT> {
    if (query._selects == undefined) {
        throw new Error(`Cannot use SQL_CALC_FOUND_ROWS before SELECT clause`);
    }
    return new Query({
        ...query,
        _sqlCalcFoundRows : true,
    });
}