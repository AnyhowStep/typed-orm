import { AnyAliasedTable } from "../aliased-table";
import { Tuple } from "../tuple";
import { JoinToDelegate, JoinTo } from "./join-to-delegate";
import { AnyColumn, ColumnTupleUtil } from "../column";
import { ColumnCollectionUtil } from "../column-collection";
export declare namespace JoinToDelegateUtil {
    function execute<ToTableT extends AnyAliasedTable, FromT extends Tuple<AnyColumn>>(toTable: ToTableT, from: FromT, toDelegate: JoinToDelegate<ToTableT, FromT>): JoinTo<ToTableT, FromT>;
    type CreateUsingUnsafe<ToTableT extends AnyAliasedTable, FromT extends Tuple<AnyColumn>> = (ColumnTupleUtil.WithTableAlias<FromT, ToTableT["alias"]>);
    type CreateUsing<ToTableT extends AnyAliasedTable, FromT extends Tuple<AnyColumn>> = (ColumnCollectionUtil.HasColumns<ColumnCollectionUtil.ToNullable<ToTableT["columns"]>, ColumnTupleUtil.WithTableAlias<FromT, ToTableT["alias"]>> extends true ? ColumnTupleUtil.WithTableAlias<FromT, ToTableT["alias"]> : never);
    function createUsing<ToTableT extends AnyAliasedTable, FromT extends Tuple<AnyColumn>>(toTable: ToTableT, from: FromT): (CreateUsing<ToTableT, FromT>);
}
//# sourceMappingURL=util.d.ts.map