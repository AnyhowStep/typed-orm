import { AfterFromClause } from "../predicate";
import { ITable } from "../../../table";
import { InnerJoin } from "./inner-join";
import { JoinDeclarationUtil } from "../../../join-declaration";
export declare type FromTableDelegate<QueryT extends AfterFromClause> = ((tables: {
    [tableAlias in QueryT["_joins"][number]["aliasedTable"]["alias"]]: (Extract<QueryT["_joins"][number]["aliasedTable"], {
        alias: tableAlias;
    }>);
}) => QueryT["_joins"][number]["aliasedTable"]);
export declare function innerJoinUsingPk<QueryT extends AfterFromClause, FromDelegateT extends FromTableDelegate<QueryT>, ToTableT extends ITable & {
    primaryKey: string[];
}>(query: QueryT, fromTableDelegate: FromDelegateT, toTable: JoinDeclarationUtil.AssertValidJoinUsingPkTarget<ReturnType<FromDelegateT>, ToTableT>): (InnerJoin<QueryT, ToTableT>);
//# sourceMappingURL=inner-join-using-pk.d.ts.map