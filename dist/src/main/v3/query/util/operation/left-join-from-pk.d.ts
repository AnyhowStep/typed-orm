import { AfterFromClause } from "../predicate";
import { IAliasedTable } from "../../../aliased-table";
import { LeftJoin } from "./left-join";
import { JoinDeclarationUtil } from "../../../join-declaration";
import { JoinUsingFromPkDelegate } from "./inner-join-from-pk";
export declare function leftJoinUsingFromPk<QueryT extends AfterFromClause, FromDelegateT extends JoinUsingFromPkDelegate<QueryT>, ToTableT extends IAliasedTable>(query: QueryT, fromTableDelegate: FromDelegateT, toTable: (ToTableT & JoinDeclarationUtil.AssertValidJoinUsingPkTargetImpl<ToTableT, Extract<QueryT["_joins"][number]["aliasedTable"], ReturnType<FromDelegateT>>>)): (LeftJoin<QueryT, ToTableT>);
//# sourceMappingURL=left-join-from-pk.d.ts.map