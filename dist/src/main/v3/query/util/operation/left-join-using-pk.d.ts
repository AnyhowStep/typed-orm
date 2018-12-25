import { AfterFromClause } from "../predicate";
import { ITable } from "../../../table";
import { LeftJoin } from "./left-join";
import { JoinDeclarationUtil } from "../../../join-declaration";
import { FromTableDelegate } from "./inner-join-using-pk";
export declare function leftJoinUsingPk<QueryT extends AfterFromClause, FromDelegateT extends FromTableDelegate<QueryT>, ToTableT extends ITable & {
    primaryKey: string[];
}>(query: QueryT, fromTableDelegate: FromDelegateT, toTable: JoinDeclarationUtil.AssertValidJoinUsingPkTarget<Extract<QueryT["_joins"][number]["aliasedTable"], ReturnType<FromDelegateT>>, ToTableT>): (LeftJoin<QueryT, ToTableT>);
//# sourceMappingURL=left-join-using-pk.d.ts.map