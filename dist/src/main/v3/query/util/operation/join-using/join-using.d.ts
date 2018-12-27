import { AfterFromClause, AssertValidJoinTarget } from "../../predicate";
import { IAliasedTable } from "../../../../aliased-table";
import { IJoin, JoinType } from "../../../../join";
import { ColumnRefUtil } from "../../../../column-ref";
import { IColumn, ColumnUtil } from "../../../../column";
import { NonEmptyTuple } from "../../../../tuple";
import { ColumnMapUtil } from "../../../../column-map";
import { StringUtil } from "../../../../string";
import { JoinResult } from "../join";
export declare type JoinUsingColumnUnion<ColumnT extends IColumn, AliasedTableT extends IAliasedTable> = (ColumnT extends IColumn ? (ColumnUtil.WithTableAlias<ColumnT, AliasedTableT["alias"]> extends ColumnUtil.ToInterface<ColumnUtil.ToNullable<ColumnUtil.FromColumnMap<AliasedTableT["columns"]>>> ? Extract<ColumnT, IColumn> : never) : never);
export declare function joinUsingColumns<ColumnsT extends IColumn[], AliasedTableT extends IAliasedTable>(columns: ColumnsT, aliasedTable: AliasedTableT): JoinUsingColumnUnion<ColumnsT[number], AliasedTableT>[];
export declare type JoinUsingDelegate<JoinsT extends IJoin[], AliasedTableT extends IAliasedTable> = ((columns: (StringUtil.IsOneLiteral<JoinsT[number]["aliasedTable"]["alias"]> extends true ? ColumnMapUtil.FromColumnArray<JoinUsingColumnUnion<ColumnUtil.FromJoin<JoinsT[number]>, AliasedTableT>[]> : ColumnRefUtil.FromColumnArray<JoinUsingColumnUnion<ColumnUtil.FromJoinArray<JoinsT>, AliasedTableT>[]>)) => (NonEmptyTuple<(JoinUsingColumnUnion<ColumnUtil.FromJoinArray<JoinsT>, AliasedTableT>)>));
export declare function joinUsing<QueryT extends AfterFromClause, AliasedTableT extends IAliasedTable, UsingDelegateT extends JoinUsingDelegate<QueryT["_joins"], AliasedTableT>, NullableT extends boolean>(query: QueryT, aliasedTable: AssertValidJoinTarget<QueryT, AliasedTableT>, usingDelegate: UsingDelegateT, nullable: NullableT, joinType: JoinType): (JoinResult<QueryT, AliasedTableT, NullableT>);
//# sourceMappingURL=join-using.d.ts.map