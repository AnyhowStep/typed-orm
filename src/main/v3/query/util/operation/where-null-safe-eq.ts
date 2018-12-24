import * as sd from "schema-decorator";
import {Query} from "../../query";
import {AfterFromClause, BeforeSelectClause} from "../predicate";
import {ColumnRefUtil} from "../../../column-ref";
import {ColumnUtil, Column} from "../../../column";
import {IAnonymousTypedExpr} from "../../../expr";
import {and} from "../../../expr-library";
import {JoinArrayUtil} from "../../../join-array";
import {ColumnIdentifierRefUtil} from "../../../column-identifier-ref";
import {nullSafeEq} from "../../../expr-library";
import {PrimitiveExpr} from "../../../primitive-expr";
import {RawExprUtil} from "../../../raw-expr";
import {IJoin} from "../../../join";

export type WhereNullSafeEqDelegate<
    QueryT extends AfterFromClause & BeforeSelectClause
> = (
    (
        columns : ColumnRefUtil.ToConvenient<
            ColumnRefUtil.FromJoinArray<QueryT["_joins"]>
        >
    ) => (
        ColumnUtil.FromColumnRef<
            ColumnRefUtil.FromJoinArray<QueryT["_joins"]>
        >
    )
);
export type WhereNullSafeEq<
    QueryT extends AfterFromClause & BeforeSelectClause,
    DelegateT extends WhereNullSafeEqDelegate<QueryT>,
    ValueT extends PrimitiveExpr
> = (
    Query<{
        readonly _distinct : QueryT["_distinct"];
        readonly _sqlCalcFoundRows : QueryT["_sqlCalcFoundRows"];

        readonly _joins : (
            JoinArrayUtil.ReplaceColumn<QueryT["_joins"], Column<{
                tableAlias : ReturnType<DelegateT>["tableAlias"],
                name : ReturnType<DelegateT>["name"],
                assertDelegate : sd.AssertDelegate<ValueT>,
            }>>
        ),
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

export type AssertValidNullSafeEqTarget<
    QueryT extends AfterFromClause & BeforeSelectClause,
    DelegateT extends WhereNullSafeEqDelegate<QueryT>,
    ValueT extends PrimitiveExpr
> = (
    ValueT &
    (
        ValueT extends ReturnType<ReturnType<DelegateT>["assertDelegate"]> ?
        unknown :
        [
            ValueT,
            "does not extend",
            ReturnType<ReturnType<DelegateT>["assertDelegate"]>
        ]
    )
);

export function whereNullSafeEq<
    QueryT extends AfterFromClause & BeforeSelectClause,
    DelegateT extends WhereNullSafeEqDelegate<QueryT>,
    ValueT extends PrimitiveExpr
> (
    query : QueryT,
    delegate : DelegateT,
    value : AssertValidNullSafeEqTarget<QueryT, DelegateT, ValueT>
) : WhereNullSafeEq<QueryT, DelegateT, ValueT> {
    if (query._joins == undefined) {
        throw new Error(`Cannot use whereNullSafeEq() before FROM clause`);
    }
    if (query._selects != undefined) {
        throw new Error(`Cannot use whereNullSafeEq() after SELECT clause`);
    }

    const queryRef = ColumnRefUtil.fromJoinArray(query._joins as QueryT["_joins"]);
    const rawColumn : ReturnType<DelegateT> = delegate(
        ColumnRefUtil.toConvenient(queryRef)
    ) as unknown as ReturnType<DelegateT>;

    ColumnIdentifierRefUtil.assertHasColumnIdentifier(queryRef, rawColumn);

    const expr : IAnonymousTypedExpr<boolean> = nullSafeEq(
        rawColumn,
        value as any
    );
    const newJoins = JoinArrayUtil.replaceColumn(
        query._joins,
        new Column(
            {
                tableAlias : rawColumn.tableAlias,
                name : rawColumn.name,
                assertDelegate : sd.chain(
                    rawColumn.assertDelegate,
                    RawExprUtil.assertDelegate(value as any)
                ),
            },
            rawColumn.__subTableName,
            rawColumn.__isInSelectClause
        )
    );

    const {
        _distinct,
        _sqlCalcFoundRows,

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

            _joins : (newJoins as IJoin[]),
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
    ) as any;
}