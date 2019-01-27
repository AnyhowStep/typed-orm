import {Query} from "../../query";
import {AfterFromClause} from "../predicate";
import {ColumnRefUtil} from "../../../column-ref";
import {RawExpr, RawExprUtil} from "../../../raw-expr";
import {ExprUtil} from "../../../expr";
import {ColumnUtil, IColumn} from "../../../column";
import {IAnonymousTypedExpr} from "../../../expr";
import {and} from "../../../expr-library";
import {ColumnIdentifierRefUtil} from "../../../column-identifier-ref";

export type HavingDelegate<
    QueryT extends AfterFromClause
> = (
    (
        columns : ColumnRefUtil.ToConvenient<ColumnRefUtil.FromQuery<QueryT>>,
        query : QueryT,
    ) => RawExpr<boolean>
);

export type Having<
    QueryT extends AfterFromClause
> = (
    Query<{
        readonly _distinct : QueryT["_distinct"];
        readonly _sqlCalcFoundRows : QueryT["_sqlCalcFoundRows"];

        readonly _joins : QueryT["_joins"],
        readonly _parentJoins : QueryT["_parentJoins"],
        readonly _selects : QueryT["_selects"],
        readonly _where : QueryT["_where"],

        readonly _grouped : QueryT["_grouped"],
        //TODO-DEBATE See if this needs to be more strongly typed
        readonly _having : IAnonymousTypedExpr<boolean>,

        readonly _orders : QueryT["_orders"],
        readonly _limit : QueryT["_limit"],

        readonly _unions : QueryT["_unions"],
        readonly _unionOrders : QueryT["_unionOrders"],
        readonly _unionLimit : QueryT["_unionLimit"],

        readonly _mapDelegate : QueryT["_mapDelegate"],
    }>
);

//https://github.com/Microsoft/TypeScript/issues/29133
export type AssertValidHavingDelegate_Hack<
    QueryT extends AfterFromClause,
    HavingDelegateT extends HavingDelegate<QueryT>,
    ResultT
> = (
    ColumnUtil.AssertValidUsed<
        RawExprUtil.UsedColumns<ReturnType<HavingDelegateT>>[number],
        //Weird that this needs to be wrapped in Extract<>
        Extract<ColumnUtil.FromQuery<QueryT>, IColumn>
    > extends never ?
    ResultT :
    ColumnUtil.AssertValidUsed<
        RawExprUtil.UsedColumns<ReturnType<HavingDelegateT>>[number],
        //Weird that this needs to be wrapped in Extract<>
        Extract<ColumnUtil.FromQuery<QueryT>, IColumn>
    >|void
);

export type HavingResult<
    QueryT extends AfterFromClause,
    HavingDelegateT extends HavingDelegate<QueryT>
> = (
    AssertValidHavingDelegate_Hack<
        QueryT,
        HavingDelegateT,
        Having<QueryT>
    >
);

//Must be called after `FROM` as per MySQL
export function having<
    QueryT extends AfterFromClause,
    HavingDelegateT extends HavingDelegate<QueryT>
> (
    query : QueryT,
    delegate : HavingDelegateT
) : (
    HavingResult<
        QueryT,
        HavingDelegateT
    >
) {
    if (query._joins == undefined) {
        throw new Error(`Cannot use HAVING before FROM clause`);
    }
    const queryRef = ColumnRefUtil.fromQuery(query);
    const rawExpr = delegate(
        ColumnRefUtil.toConvenient(queryRef),
        query
    ) as ReturnType<HavingDelegateT>;
    const expr = ExprUtil.fromRawExpr(rawExpr);

    ColumnIdentifierRefUtil.assertHasColumnIdentifiers(
        queryRef,
        expr.usedColumns
    );

    const {
        _distinct,
        _sqlCalcFoundRows,

        _joins,
        _parentJoins,
        _selects,
        _where,

        _grouped,

        _orders,
        _limit,

        _unions,
        _unionOrders,
        _unionLimit,

        _mapDelegate,
    } = query;

    //TODO Investigate why removing `as any` causes lag
    //and failure
    const result : Having<QueryT> = new Query(
        {
            _distinct,
            _sqlCalcFoundRows,

            _joins,
            _parentJoins,
            _selects,
            _where,

            _grouped,
            _having : (
                query._having == undefined ?
                expr :
                and(query._having, expr)
            ),

            _orders,
            _limit,

            _unions,
            _unionOrders,
            _unionLimit,

            _mapDelegate,
        }
    ) as any;
    return result as any;
}
/*
import * as o from "../../../index";
const table = o.table("test", {
    x : o.bigint(),
    y : o.varChar.nullable(),
    z : o.boolean(),
});
const nse = o.nullSafeEq(table.columns.x, table.columns.x);
const rnse = () => nse
o.from(table)
    .having((_c) => nse)
    .having(rnse);

const table2 = o.table("test2", {
    x : o.bigint(),
    y : o.varChar(),
    z : o.boolean(),
});
const nse2 = o.nullSafeEq(table.columns.x, table2.columns.x);
o.from(table)
    .having((_c) => nse2)
    .having(rnse);

const table3 = o.table("test", {
    x : o.bigint.nullable(),
    y : o.varChar(),
    z : o.boolean(),
});
const nse3 = o.nullSafeEq(table.columns.x, table3.columns.x);
o.from(table)
    .having((_c) => nse3)
    .having(rnse);

const table4 = o.table("test", {
    x : o.bigint.nullable(),
    y : o.varChar(),
    z : o.boolean(),
});
const nse4 = o.nullSafeEq(table.columns.y, table4.columns.y);
o.from(table)
    .having((_c) => nse4)
    .having(rnse);

const table5 = o.table("test", {
    x : o.bigint.nullable(),
    y : o.varChar(),
    z : o.boolean(),
});
const nse5 = o.eq(table5.columns.y, "test");
o.from(table)
    .having((_c) => nse5)
    .having(rnse);
*/