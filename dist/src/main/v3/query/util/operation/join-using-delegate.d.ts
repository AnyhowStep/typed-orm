import { IAliasedTable } from "../../../aliased-table";
import { IJoin } from "../../../join";
import { ColumnRefUtil } from "../../../column-ref";
import { IColumn, ColumnUtil } from "../../../column";
import { NonEmptyTuple } from "../../../tuple";
export declare type JoinUsingColumnUnion<ColumnT extends IColumn, AliasedTableT extends IAliasedTable> = (ColumnT extends IColumn ? (ColumnUtil.WithTableAlias<ColumnT, AliasedTableT["alias"]> extends ColumnUtil.FromColumnMap<AliasedTableT["columns"]> ? Extract<ColumnT, IColumn> : never) : never);
export declare function joinUsingColumns<ColumnsT extends IColumn[], AliasedTableT extends IAliasedTable>(columns: ColumnsT, aliasedTable: AliasedTableT): JoinUsingColumnUnion<ColumnsT[number], AliasedTableT>[];
export declare type JoinUsingDelegate<JoinsT extends IJoin[], AliasedTableT extends IAliasedTable> = ((columns: ColumnRefUtil.ToConvenient<ColumnRefUtil.FromColumnArray<JoinUsingColumnUnion<ColumnUtil.FromJoinArray<JoinsT>, AliasedTableT>[]>>) => (NonEmptyTuple<(JoinUsingColumnUnion<ColumnUtil.FromJoinArray<JoinsT>, AliasedTableT>)>));
//# sourceMappingURL=join-using-delegate.d.ts.map