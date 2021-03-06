import { IAliasedTable } from "../../../../aliased-table";
import { ITable } from "../../../../table";
import { ColumnUtil } from "../../../../column";
import { QueryUtil } from "../../../../query";
import { NonEmptyTuple } from "../../../../tuple";
import { ColumnMapUtil } from "../../../../column-map";
import { KeyUtil } from "../../../../key";
import { AssertValidJoinTarget } from "../../predicate";
import { JoinDeclaration } from "../../../join-declaration";
import { JoinType } from "../../../../join";
export declare type JoinCkUsingDelegate<FromTableT extends IAliasedTable, ToTableT extends ITable> = ((columns: ColumnMapUtil.FromColumnArray<Extract<QueryUtil.JoinUsingColumnUnion<ColumnUtil.FromColumnMap<FromTableT["columns"]>, ToTableT>, {
    name: ToTableT["candidateKeys"][number][number];
}>[]>) => (NonEmptyTuple<Extract<QueryUtil.JoinUsingColumnUnion<ColumnUtil.FromColumnMap<FromTableT["columns"]>, ToTableT>, {
    name: ToTableT["candidateKeys"][number][number];
}>>));
export declare type AssertValidJoinCkUsingDelegate_Hack<FromTableT extends IAliasedTable, ToTableT extends ITable, DelegateT extends JoinCkUsingDelegate<FromTableT, ToTableT>, ResultT> = (KeyUtil.Array.HasKey<ToTableT["candidateKeys"], ReturnType<DelegateT>[number]["name"][]> extends true ? ResultT : [ReturnType<DelegateT>[number]["name"][], "is not a candidate key of", ToTableT["alias"]] | void);
export declare function joinCkUsing<FromTableT extends IAliasedTable, ToTableT extends ITable, UsingDelegateT extends JoinCkUsingDelegate<FromTableT, ToTableT>, NullableT extends boolean>(fromTable: FromTableT, toTable: AssertValidJoinTarget<FromTableT, ToTableT>, usingDelegate: UsingDelegateT, nullable: NullableT, joinType: JoinType.INNER | JoinType.LEFT): (AssertValidJoinCkUsingDelegate_Hack<FromTableT, ToTableT, UsingDelegateT, JoinDeclaration<{
    readonly fromTable: FromTableT;
    readonly toTable: ToTableT;
    readonly nullable: NullableT;
}>>);
