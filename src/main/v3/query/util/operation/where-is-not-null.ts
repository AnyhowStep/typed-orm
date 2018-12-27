import * as sd from "schema-decorator";
import {Query} from "../../query";
import {AfterFromClause} from "../predicate";
import {ColumnRefUtil} from "../../../column-ref";
import {ColumnUtil, Column} from "../../../column";
import {IAnonymousTypedExpr} from "../../../expr";
import {and} from "../../../expr-library";
import {JoinArrayUtil} from "../../../join-array";
import {ColumnIdentifierRefUtil} from "../../../column-identifier-ref";
import {isNotNull} from "../../../expr-library";

export type WhereIsNotNullDelegate<
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
export type WhereIsNotNull<
    QueryT extends AfterFromClause,
    DelegateT extends WhereIsNotNullDelegate<QueryT>
> = (
    Query<{
        readonly _distinct : QueryT["_distinct"];
        readonly _sqlCalcFoundRows : QueryT["_sqlCalcFoundRows"];

        readonly _joins : (
            JoinArrayUtil.ReplaceColumn<QueryT["_joins"], Column<{
                tableAlias : ReturnType<DelegateT>["tableAlias"],
                name : ReturnType<DelegateT>["name"],
                assertDelegate : sd.AssertDelegate<
                    Exclude<
                        ReturnType<ReturnType<DelegateT>["assertDelegate"]>,
                        null
                    >
                >,
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

export function whereIsNotNull<
    QueryT extends AfterFromClause,
    DelegateT extends WhereIsNotNullDelegate<QueryT>
> (
    query : QueryT,
    delegate : DelegateT
) : WhereIsNotNull<QueryT, DelegateT> {
    if (query._joins == undefined) {
        throw new Error(`Cannot use whereIsNotNull() before FROM clause`);
    }
    const queryRef = ColumnRefUtil.fromJoinArray(query._joins as QueryT["_joins"]);
    const rawColumn : ReturnType<DelegateT> = delegate(
        ColumnRefUtil.toConvenient(queryRef)
    ) as unknown as ReturnType<DelegateT>;

    ColumnIdentifierRefUtil.assertHasColumnIdentifier(queryRef, rawColumn);
    if (!sd.isNullable(rawColumn.assertDelegate)) {
        throw new Error(`${rawColumn.tableAlias}.${rawColumn.name} is not nullable`);
    }

    const expr = isNotNull(rawColumn);
    const newJoins = JoinArrayUtil.replaceColumn(
        query._joins,
        new Column(
            {
                tableAlias : rawColumn.tableAlias,
                name : rawColumn.name,
                assertDelegate : sd.notNullable(rawColumn.assertDelegate),
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
    ) as unknown as WhereIsNotNull<QueryT, DelegateT>;
}