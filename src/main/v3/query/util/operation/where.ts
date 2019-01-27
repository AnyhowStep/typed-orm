import {Query} from "../../query";
import {AfterFromClause} from "../predicate";
import {ColumnRefUtil} from "../../../column-ref";
import {RawExpr, RawExprUtil} from "../../../raw-expr";
import {ExprUtil} from "../../../expr";
import {ColumnUtil, IColumn} from "../../../column";
import {IAnonymousTypedExpr} from "../../../expr";
import {and} from "../../../expr-library";

export type WhereDelegate<
    QueryT extends AfterFromClause
> = (
    (
        columns : ColumnRefUtil.ToConvenient<ColumnRefUtil.FromQueryJoins<QueryT>>,
        query : QueryT,
    ) => RawExpr<boolean>
);

export type Where<
    QueryT extends AfterFromClause
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

//https://github.com/Microsoft/TypeScript/issues/29133
export type AssertValidWhereDelegate_Hack<
    QueryT extends AfterFromClause,
    WhereDelegateT extends WhereDelegate<QueryT>,
    ResultT
> = (
    ColumnUtil.AssertValidUsed<
        RawExprUtil.UsedColumns<ReturnType<WhereDelegateT>>[number],
        //Weird that this needs to be wrapped in Extract<>
        Extract<ColumnUtil.FromQueryJoins<QueryT>, IColumn>
    > extends never ?
    ResultT :
    ColumnUtil.AssertValidUsed<
        RawExprUtil.UsedColumns<ReturnType<WhereDelegateT>>[number],
        //Weird that this needs to be wrapped in Extract<>
        Extract<ColumnUtil.FromQueryJoins<QueryT>, IColumn>
    >|void
);

export type WhereResult<
    QueryT extends AfterFromClause,
    WhereDelegateT extends WhereDelegate<QueryT>
> = (
    AssertValidWhereDelegate_Hack<
        QueryT,
        WhereDelegateT,
        Where<QueryT>
    >
);

//Must be called after `FROM` as per MySQL
export function where<
    QueryT extends AfterFromClause,
    WhereDelegateT extends WhereDelegate<QueryT>
> (
    query : QueryT,
    delegate : WhereDelegateT
) : WhereResult<QueryT, WhereDelegateT> {
    if (query._joins == undefined) {
        throw new Error(`Cannot use WHERE before FROM clause`);
    }
    const queryRef = ColumnRefUtil.fromQueryJoins(query);
    const rawExpr : ReturnType<WhereDelegateT> = delegate(
        ColumnRefUtil.toConvenient(queryRef),
        query
    ) as ReturnType<WhereDelegateT>;
    const expr = ExprUtil.fromRawExpr(rawExpr);

    ColumnRefUtil.assertHasColumnIdentifiers(queryRef, expr.usedColumns);

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

    const result : Where<QueryT> = new Query(
        {
            _distinct,
            _sqlCalcFoundRows,

            _joins,
            _parentJoins,
            _selects,
            _where : (
                query._where == undefined ?
                expr :
                and(query._where, expr)
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
    ) as Where<QueryT>;
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
    .where((_c) => nse)
    .where(rnse);

const table2 = o.table("test2", {
    x : o.bigint(),
    y : o.varChar(),
    z : o.boolean(),
});
const nse2 = o.nullSafeEq(table.columns.x, table2.columns.x);
o.from(table)
    .where((_c) => nse2)
    .where(rnse);

const table3 = o.table("test", {
    x : o.bigint.nullable(),
    y : o.varChar(),
    z : o.boolean(),
});
const nse3 = o.nullSafeEq(table.columns.x, table3.columns.x);
o.from(table)
    .where((_c) => nse3)
    .where(rnse);

const table4 = o.table("test", {
    x : o.bigint.nullable(),
    y : o.varChar(),
    z : o.boolean(),
});
const nse4 = o.nullSafeEq(table.columns.y, table4.columns.y);
o.from(table)
    .where((_c) => nse4)
    .where(rnse);

const table5 = o.table("test", {
    x : o.bigint.nullable(),
    y : o.varChar(),
    z : o.boolean(),
});
const nse5 = o.eq(table5.columns.y, "test");
o.from(table)
    .where((_c) => nse5)
    .where(rnse);
*/