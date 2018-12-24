import {Query} from "../../query";
import {AfterFromClause} from "../predicate";
import {IAnonymousTypedExpr} from "../../../expr";
import {and} from "../../../expr-library";
import {nullSafeEq} from "../../../expr-library";
import {ITable, Table} from "../../../table";

export type WhereEqCandidateKey<
    QueryT extends AfterFromClause,
> = (
    Query<{
        readonly _distinct : QueryT["_distinct"];
        readonly _sqlCalcFoundRows : QueryT["_sqlCalcFoundRows"];

        readonly _joins : QueryT["_joins"],
        readonly _parentJoins : QueryT["_parentJoins"],
        readonly _selects : QueryT["_selects"],
        //TODO-DEBATE See if this needs to be more strongly typed
        readonly _where : IAnonymousTypedExpr<boolean>,

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

/*
    If the CK is (id) but you pass (id, otherField) and
    somehow get it to compile, the run-time will ignore
    otherField.
*/
export function whereEqCandidateKey<
    QueryT extends AfterFromClause,
    TableT extends ITable,
> (
    query : QueryT,
    table : TableT,
    key : Table.CandidateKey<TableT>
) : WhereEqCandidateKey<QueryT> {
    if (query._joins == undefined) {
        throw new Error(`Cannot use whereEqCandidateKey() before FROM clause`);
    }
    const candidateKeyAssertDelegate = (table instanceof Table) ?
        table.candidateKeyAssertDelegate() :
        Table.candidateKeyAssertDelegate(table);

    key = candidateKeyAssertDelegate(`${table.alias} CK`, key);

    const exprArr : IAnonymousTypedExpr<boolean>[] = [];
    for (let columnName in key) {
        const value = key[columnName];
        exprArr.push(nullSafeEq(
            table.columns[columnName],
            value
        ));
    }

    const {
        _distinct,
        _sqlCalcFoundRows,

        _joins,
        _parentJoins,
        _selects,

        _grouped,
        _having,

        _orders,
        _limit,

        _unions,
        _unionOrders,
        _unionLimit,

        _mapDelegate,
    } = query;

    return new Query(
        {
            _distinct,
            _sqlCalcFoundRows,

            _joins,
            _parentJoins,
            _selects,
            _where : (
                query._where == undefined ?
                and(...(exprArr as any)) :
                and(query._where, ...(exprArr as any))
            ) as IAnonymousTypedExpr<boolean>,

            _grouped,
            _having,

            _orders,
            _limit,

            _unions,
            _unionOrders,
            _unionLimit,

            _mapDelegate,
        }
    ) as any;
}