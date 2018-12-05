import { Query } from "../../query";
import { AfterFromClause, AssertUniqueJoinTarget } from "../predicate";
import { JoinFromDelegate, JoinToDelegate } from "./join-delegate";
import { IAliasedTable } from "../../../aliased-table";
import { Join } from "../../../join";
export declare type LeftJoin<QueryT extends AfterFromClause, AliasedTableT extends IAliasedTable> = (Query<{
    readonly joins: (QueryT["joins"][number] | Join<{
        aliasedTable: AliasedTableT;
        columns: AliasedTableT["columns"];
        nullable: true;
    }>)[];
    readonly parentJoins: QueryT["parentJoins"];
    readonly unions: QueryT["unions"];
    readonly selects: QueryT["selects"];
    readonly limit: QueryT["limit"];
    readonly unionLimit: QueryT["unionLimit"];
}>);
export declare function leftJoin<QueryT extends AfterFromClause, AliasedTableT extends IAliasedTable, FromDelegateT extends JoinFromDelegate<QueryT["joins"]>>(query: QueryT, aliasedTable: AssertUniqueJoinTarget<QueryT, AliasedTableT>, fromDelegate: FromDelegateT, toDelegate: JoinToDelegate<QueryT, AliasedTableT, FromDelegateT>): (LeftJoin<QueryT, AliasedTableT>);
//# sourceMappingURL=left-join.d.ts.map