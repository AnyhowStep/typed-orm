import {Query} from "../../query";
import {AfterFromClause, AssertValidJoinTargetImpl} from "../predicate";
import {invokeJoinDelegate} from "./join-delegate";
import {Join} from "../../../join";
import {IJoinDeclaration} from "../../../join-declaration";

export type UseJoin<
    QueryT extends AfterFromClause,
    JoinDeclT extends IJoinDeclaration
> = (
    Query<{
        readonly _distinct : QueryT["_distinct"];
        readonly _sqlCalcFoundRows : QueryT["_sqlCalcFoundRows"];

        readonly _joins : (
            QueryT["_joins"][number] |
            Join<{
                aliasedTable : JoinDeclT["toTable"],
                columns : JoinDeclT["toTable"]["columns"],
                nullable : JoinDeclT["nullable"],
            }>
        )[],
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
export type AssertValidJoinDeclaration<
    QueryT extends AfterFromClause,
    JoinDeclT extends IJoinDeclaration
> = (
    JoinDeclT &
    AssertValidJoinTargetImpl<
        QueryT,
        JoinDeclT["toTable"]
    >
);
export function useJoin<
    QueryT extends AfterFromClause,
    JoinDeclT extends IJoinDeclaration
> (
    query : QueryT,
    joinDecl : AssertValidJoinDeclaration<QueryT, JoinDeclT>
) : (
    UseJoin<QueryT, JoinDeclT>
) {
    const {from, to} = invokeJoinDelegate(
        query,
        joinDecl.toTable as any,
        () => joinDecl.from as any,
        () => joinDecl.to
    );

    const {
        _distinct,
        _sqlCalcFoundRows,

        _parentJoins,
        _selects,
        _where,

        _grouped,
        _having,

        _orders,
        _limit,

        _unions,
        _unionOrders,
        _unionLimit,

        _mapDelegate,
    } = query;
    return new Query({
        _distinct,
        _sqlCalcFoundRows,
        _joins : [
            ...query._joins,
            new Join(
                {
                    aliasedTable : joinDecl.toTable,
                    columns : joinDecl.toTable.columns,
                    nullable : joinDecl.nullable,
                },
                joinDecl.joinType,
                from,
                to,
            ),
        ],
        _parentJoins,
        _selects,
        _where,

        _grouped,
        _having,

        _orders,
        _limit,

        _unions,
        _unionOrders,
        _unionLimit,

        _mapDelegate,
    });
}