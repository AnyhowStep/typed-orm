import { IAliasedTable } from "../../../../aliased-table";
import { JoinDeclaration } from "../../../join-declaration";
import { JoinFromDelegate, JoinToDelegate } from "./join";
import { AssertValidJoinTarget } from "../../predicate";
export declare type LeftJoin<FromTableT extends IAliasedTable, ToTableT extends IAliasedTable> = (JoinDeclaration<{
    readonly fromTable: FromTableT;
    readonly toTable: ToTableT;
    readonly nullable: true;
}>);
export declare function leftJoin<FromTableT extends IAliasedTable, ToTableT extends IAliasedTable, FromDelegateT extends JoinFromDelegate<FromTableT>>(fromTable: FromTableT, toTable: AssertValidJoinTarget<FromTableT, ToTableT>, fromDelegate: FromDelegateT, toDelegate: JoinToDelegate<FromTableT, ToTableT, FromDelegateT>): LeftJoin<FromTableT, ToTableT>;
