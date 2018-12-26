import { AfterFromClause } from "../predicate";
import { ITable } from "../../../table";
import { InnerJoin } from "./inner-join";
import { JoinDeclarationUtil } from "../../../join-declaration";
export declare type FromTableDelegate<QueryT extends AfterFromClause> = ((tables: {
    [tableAlias in QueryT["_joins"][number]["aliasedTable"]["alias"]]: ({
        alias: tableAlias;
    });
}) => {
    alias: QueryT["_joins"][number]["aliasedTable"]["alias"];
});
export declare function innerJoinUsingPk<QueryT extends AfterFromClause, FromDelegateT extends FromTableDelegate<QueryT>, ToTableT extends ITable & {
    primaryKey: string[];
}>(query: QueryT, fromTableDelegate: FromDelegateT, toTable: JoinDeclarationUtil.AssertValidJoinUsingPkTarget<Extract<QueryT["_joins"][number]["aliasedTable"], ReturnType<FromDelegateT>>, ToTableT>): (InnerJoin<QueryT, ToTableT>);
//# sourceMappingURL=inner-join-pk.d.ts.map