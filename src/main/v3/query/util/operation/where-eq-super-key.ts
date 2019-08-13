import {Query} from "../../query";
import {AfterFromClause} from "../predicate";
import {IAnonymousTypedExpr} from "../../../expr";
import {and} from "../../../expr-library";
import {ITable, Table, TableUtil} from "../../../table";
import {ColumnIdentifierRefUtil} from "../../../column-identifier-ref";
import {ColumnRefUtil} from "../../../column-ref";
import {SuperKey, SuperKeyUtil} from "../../../super-key";

export type WhereEqSuperKey<
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

export function whereEqSuperKey<
    QueryT extends AfterFromClause,
    TableT extends ITable,
> (
    query : QueryT,
    table : TableT & QueryT["_joins"][number]["aliasedTable"],
    key : SuperKey<TableT>
) : WhereEqSuperKey<QueryT> {
    if (query._joins == undefined) {
        throw new Error(`Cannot use whereEqSuperKey() before FROM clause`);
    }
    const superKeyAssertDelegate = (table instanceof Table) ?
        table.superKeyAssertDelegate() :
        SuperKeyUtil.assertDelegate(table);

    key = superKeyAssertDelegate(`${table.alias} SK`, key) as SuperKey<TableT>;

    const ref = ColumnIdentifierRefUtil.fromJoinArray(
        query._joins
    );
    const condition = TableUtil.eqSuperKey(table, key);
    ColumnRefUtil.assertIsSubset(condition.usedRef, ref);

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
                condition :
                and(query._where, condition)
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