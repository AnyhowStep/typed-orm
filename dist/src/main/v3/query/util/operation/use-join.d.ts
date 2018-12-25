import { Query } from "../../query";
import { AfterFromClause, AssertValidJoinTargetImpl } from "../predicate";
import { Join } from "../../../join";
import { IJoinDeclaration } from "../../../join-declaration";
export declare type UseJoin<QueryT extends AfterFromClause, JoinDeclT extends IJoinDeclaration> = (Query<{
    readonly _distinct: QueryT["_distinct"];
    readonly _sqlCalcFoundRows: QueryT["_sqlCalcFoundRows"];
    readonly _joins: (QueryT["_joins"][number] | Join<{
        aliasedTable: JoinDeclT["toTable"];
        columns: JoinDeclT["toTable"]["columns"];
        nullable: JoinDeclT["nullable"];
    }>)[];
    readonly _parentJoins: QueryT["_parentJoins"];
    readonly _selects: QueryT["_selects"];
    readonly _where: QueryT["_where"];
    readonly _grouped: QueryT["_grouped"];
    readonly _having: QueryT["_having"];
    readonly _orders: QueryT["_orders"];
    readonly _limit: QueryT["_limit"];
    readonly _unions: QueryT["_unions"];
    readonly _unionOrders: QueryT["_unionOrders"];
    readonly _unionLimit: QueryT["_unionLimit"];
    readonly _mapDelegate: QueryT["_mapDelegate"];
}>);
export declare type AssertValidJoinDeclaration<QueryT extends AfterFromClause, JoinDeclT extends IJoinDeclaration> = (JoinDeclT & AssertValidJoinTargetImpl<QueryT, JoinDeclT["toTable"]>);
export declare function useJoin<QueryT extends AfterFromClause, JoinDeclT extends IJoinDeclaration>(query: QueryT, joinDecl: AssertValidJoinDeclaration<QueryT, JoinDeclT>): (UseJoin<QueryT, JoinDeclT>);
//# sourceMappingURL=use-join.d.ts.map