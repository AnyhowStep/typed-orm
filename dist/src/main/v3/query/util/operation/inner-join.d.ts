import { Query } from "../../query";
import { AfterFromClause, AssertUniqueJoinTarget } from "../predicate";
import { JoinFromDelegate, JoinToDelegate } from "./join-delegate";
import { IAliasedTable } from "../../../aliased-table";
import { Join } from "../../../join";
export declare type InnerJoin<QueryT extends AfterFromClause, AliasedTableT extends IAliasedTable> = (Query<{
    readonly joins: (QueryT["joins"][number] | Join<{
        aliasedTable: AliasedTableT;
        columns: AliasedTableT["columns"];
        nullable: false;
    }>)[];
    readonly parentJoins: QueryT["parentJoins"];
    readonly unions: QueryT["unions"];
    readonly selects: QueryT["selects"];
    readonly limit: QueryT["limit"];
    readonly unionLimit: QueryT["unionLimit"];
}>);
export declare function innerJoin<QueryT extends AfterFromClause, AliasedTableT extends IAliasedTable, FromDelegateT extends JoinFromDelegate<QueryT["joins"]>>(query: QueryT, aliasedTable: AssertUniqueJoinTarget<QueryT, AliasedTableT>, fromDelegate: FromDelegateT, toDelegate: JoinToDelegate<QueryT, AliasedTableT, FromDelegateT>): (InnerJoin<QueryT, AliasedTableT>);
//# sourceMappingURL=inner-join.d.ts.map