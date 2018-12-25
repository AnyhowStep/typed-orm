import { IAliasedTable } from "../../../aliased-table";
import { ITable } from "../../../table";
import { ColumnUtil } from "../../../column";
import { QueryUtil } from "../../../query";
import { NonEmptyTuple } from "../../../tuple";
import { ColumnMapUtil } from "../../../column-map";
import { CandidateKeyArrayUtil } from "../../../candidate-key-array";
export declare type JoinOneUsingDelegate<FromTableT extends IAliasedTable, ToTableT extends ITable> = ((columns: ColumnMapUtil.FromColumnArray<Extract<QueryUtil.JoinUsingColumnUnion<ColumnUtil.FromColumnMap<FromTableT["columns"]>, ToTableT>, {
    name: ToTableT["candidateKeys"][number][number];
}>[]>) => (NonEmptyTuple<(Extract<QueryUtil.JoinUsingColumnUnion<ColumnUtil.FromColumnMap<FromTableT["columns"]>, ToTableT>, {
    name: ToTableT["candidateKeys"][number][number];
}>)>));
export declare type AssertValidJoinOneUsingDelegate_Hack<FromTableT extends IAliasedTable, ToTableT extends ITable, DelegateT extends JoinOneUsingDelegate<FromTableT, ToTableT>, ResultT> = (CandidateKeyArrayUtil.HasKey<ToTableT["candidateKeys"], ReturnType<DelegateT>[number]["name"][]> extends true ? ResultT : [ReturnType<DelegateT>[number]["name"][], "is not a candidate key of", ToTableT["alias"]] | void);
//# sourceMappingURL=join-one-using-delegate.d.ts.map