import {Query} from "../../query";
import {AfterSelectClause} from "../predicate";

export type Distinct<QueryT extends AfterSelectClause> = (
    Query<{
        readonly _distinct : true;
        readonly _sqlCalcFoundRows : QueryT["_sqlCalcFoundRows"];

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
export function distinct<QueryT extends AfterSelectClause> (
    query : QueryT
) : Distinct<QueryT> {
    if (query._selects == undefined) {
        throw new Error(`Cannot use DISTINCT before SELECT clause`);
    }
    return new Query({
        ...query,
        _distinct : true,
    });
}