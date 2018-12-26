import { AfterFromClause } from "../predicate";
import { IAliasedTable } from "../../../aliased-table";
import { ITable } from "../../../table";
import { InnerJoin } from "./inner-join";
import { JoinDeclarationUtil } from "../../../join-declaration";
export declare type JoinUsingFromPkDelegate<QueryT extends AfterFromClause> = ((tables: {
    [tableAlias in (Extract<QueryT["_joins"][number]["aliasedTable"], ITable & {
        primaryKey: string[];
    }>["alias"])]: ({
        alias: tableAlias;
    });
}) => {
    alias: Extract<QueryT["_joins"][number]["aliasedTable"], ITable & {
        primaryKey: string[];
    }>["alias"];
});
export declare function innerJoinUsingFromPk<QueryT extends AfterFromClause, FromDelegateT extends JoinUsingFromPkDelegate<QueryT>, ToTableT extends IAliasedTable>(query: QueryT, fromTableDelegate: FromDelegateT, toTable: (ToTableT & JoinDeclarationUtil.AssertValidJoinUsingPkTargetImpl<ToTableT, Extract<QueryT["_joins"][number]["aliasedTable"], ReturnType<FromDelegateT>>>)): (InnerJoin<QueryT, ToTableT>);
//# sourceMappingURL=inner-join-using-from-pk.d.ts.map