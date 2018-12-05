import { Query } from "../../query";
import { Join } from "../../../join";
import { BeforeFromClause, AssertUniqueJoinTarget } from "../predicate";
import { IAliasedTable } from "../../../aliased-table";
export declare type From<QueryT extends BeforeFromClause, AliasedTableT extends IAliasedTable> = (Query<{
    readonly joins: Join<{
        aliasedTable: AliasedTableT;
        columns: AliasedTableT["columns"];
        nullable: false;
    }>[];
    readonly parentJoins: QueryT["parentJoins"];
    readonly unions: QueryT["unions"];
    readonly selects: QueryT["selects"];
    readonly limit: QueryT["limit"];
    readonly unionLimit: QueryT["unionLimit"];
}>);
export declare function from<QueryT extends BeforeFromClause, AliasedTableT extends IAliasedTable>(query: QueryT, aliasedTable: AssertUniqueJoinTarget<QueryT, AliasedTableT>): (From<QueryT, AliasedTableT>);
//# sourceMappingURL=from.d.ts.map