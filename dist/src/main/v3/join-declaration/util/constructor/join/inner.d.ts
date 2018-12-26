import { IAliasedTable } from "../../../../aliased-table";
import { JoinDeclaration } from "../../../join-declaration";
import { JoinFromDelegate, JoinToDelegate } from "./join";
import { AssertValidJoinTarget } from "../../predicate";
export declare type InnerJoin<FromTableT extends IAliasedTable, ToTableT extends IAliasedTable> = (JoinDeclaration<{
    readonly fromTable: FromTableT;
    readonly toTable: ToTableT;
    readonly nullable: false;
}>);
export declare function innerJoin<FromTableT extends IAliasedTable, ToTableT extends IAliasedTable, FromDelegateT extends JoinFromDelegate<FromTableT>>(fromTable: FromTableT, toTable: AssertValidJoinTarget<FromTableT, ToTableT>, fromDelegate: FromDelegateT, toDelegate: JoinToDelegate<FromTableT, ToTableT, FromDelegateT>): InnerJoin<FromTableT, ToTableT>;
//# sourceMappingURL=inner.d.ts.map