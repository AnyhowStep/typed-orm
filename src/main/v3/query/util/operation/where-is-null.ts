import * as sd from "schema-decorator";
import {Query} from "../../query";
import {AfterFromClause} from "../predicate";
import {ColumnRefUtil} from "../../../column-ref";
import {ColumnUtil, Column} from "../../../column";
import {IAnonymousTypedExpr} from "../../../expr";
import {and} from "../../../expr-library";
import {JoinUtil} from "../../../join";
import {ColumnIdentifierRefUtil} from "../../../column-identifier-ref";
import {isNull} from "../../../expr-library";

export type WhereIsNullDelegate<
    QueryT extends AfterFromClause
> = (
    (
        columns : ColumnRefUtil.ToConvenient<
            ColumnRefUtil.FromJoinArray<QueryT["_joins"]>
        >
    ) => (
        ColumnUtil.ExtractNullable<
            ColumnUtil.FromColumnRef<
                ColumnRefUtil.FromJoinArray<QueryT["_joins"]>
            >
        >
    )
);
export type WhereIsNull<
    QueryT extends AfterFromClause,
    DelegateT extends WhereIsNullDelegate<QueryT>
> = (
    Query<{
        readonly _distinct : QueryT["_distinct"];
        readonly _sqlCalcFoundRows : QueryT["_sqlCalcFoundRows"];

        readonly _joins : (
            JoinUtil.Array.ReplaceColumn<QueryT["_joins"], Column<{
                tableAlias : ReturnType<DelegateT>["tableAlias"],
                name : ReturnType<DelegateT>["name"],
                assertDelegate : sd.AssertDelegate<null>,
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

export function whereIsNull<
    QueryT extends AfterFromClause,
    DelegateT extends WhereIsNullDelegate<QueryT>
> (
    query : QueryT,
    delegate : DelegateT
) : WhereIsNull<QueryT, DelegateT> {
    if (query._joins == undefined) {
        throw new Error(`Cannot use whereIsNull() before FROM clause`);
    }
    const queryRef = ColumnRefUtil.fromJoinArray(query._joins as QueryT["_joins"]);
    const rawColumn : ReturnType<DelegateT> = delegate(
        ColumnRefUtil.toConvenient(queryRef)
    ) as unknown as ReturnType<DelegateT>;

    ColumnIdentifierRefUtil.assertHasColumnIdentifier(queryRef, rawColumn);
    if (!sd.isNullable(rawColumn.assertDelegate)) {
        throw new Error(`${rawColumn.tableAlias}.${rawColumn.name} is not nullable`);
    }

    const expr = isNull(rawColumn);
    const newJoins = JoinUtil.Array.replaceColumn(
        query._joins,
        new Column(
            {
                tableAlias : rawColumn.tableAlias,
                name : rawColumn.name,
                assertDelegate : sd.nil(),
            },
            rawColumn.__isFromExprSelectItem
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

            _joins : newJoins,
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
    ) as unknown as WhereIsNull<QueryT, DelegateT>;
}