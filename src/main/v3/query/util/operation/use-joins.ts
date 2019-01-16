import {Query} from "../../query";
import {AfterFromClause, AssertValidJoinTargetImpl} from "../predicate";
import {JoinUtil} from "../../../join";
import {IJoinDeclaration, JoinDeclarationUtil} from "../../../join-declaration";
import {NonEmptyTuple} from "../../../tuple";
import {ToUnknownIfAllFieldsNever} from "../../../type";
import {useJoin} from "./use-join";

export type UseJoins<
    QueryT extends AfterFromClause,
    ArrT extends NonEmptyTuple<IJoinDeclaration>
> = (
    Query<{
        readonly _distinct : QueryT["_distinct"];
        readonly _sqlCalcFoundRows : QueryT["_sqlCalcFoundRows"];

        readonly _joins : (
            QueryT["_joins"][number] |
            JoinUtil.FromJoinDeclaration<ArrT[number]>
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
export type AssertValidJoinDeclarationArray<
    QueryT extends AfterFromClause,
    ArrT extends NonEmptyTuple<IJoinDeclaration>
> = (
    ArrT &
    AssertValidJoinTargetImpl<
        QueryT,
        ArrT[number]["toTable"]
    > &
    //No duplicates in ArrT
    (
        JoinDeclarationUtil.Array.DuplicateToTableAlias<ArrT> extends never ?
        unknown :
        [
            "Duplicate JOIN targets not allowed",
            JoinDeclarationUtil.Array.DuplicateToTableAlias<ArrT>
        ]
    ) &
    //Each JoinDecl in ArrT can only rely on
    //joins in QueryT or joins in previous elements
    (
        ToUnknownIfAllFieldsNever<{
            [index in Extract<keyof ArrT, string>] : (
                ArrT[index] extends IJoinDeclaration ?
                (
                    ArrT[index]["fromTable"]["alias"] extends (
                        QueryT["_joins"][number]["aliasedTable"]["alias"]|
                        JoinDeclarationUtil.Array.ToTableAliasBeforeIndex<
                            ArrT,
                            index
                        >
                    ) ?
                    unknown :
                    [
                        "Invalid fromTable;",
                        index,
                        ArrT[index]["fromTable"]["alias"],
                        "is not in joins"
                    ]
                ) :
                never
            )
        }>
    )
);
export function useJoins<
    QueryT extends AfterFromClause,
    ArrT extends NonEmptyTuple<IJoinDeclaration>
> (
    query : QueryT,
    arr : AssertValidJoinDeclarationArray<QueryT, ArrT>
) : (
    UseJoins<QueryT, ArrT>
) {
    let result : any = query;
    for (let joinDecl of arr) {
        result = useJoin(result, joinDecl as any);
    }
    return result;
}