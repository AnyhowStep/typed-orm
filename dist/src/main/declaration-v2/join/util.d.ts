import * as sd from "schema-decorator";
import { Join, AnyJoin } from "./join";
import { ColumnCollectionUtil } from "../column-collection";
export declare namespace JoinUtil {
    type ToNullable<JoinT extends AnyJoin> = (Join<JoinT["table"], JoinT["columns"], true>);
    function toNullable<JoinT extends AnyJoin>(join: JoinT): (ToNullable<JoinT>);
    type ReplaceColumnType<JoinT extends AnyJoin, TableAliasT extends string, ColumnNameT extends string, NewTypeT> = (JoinT["table"]["alias"] extends TableAliasT ? (Join<JoinT["table"], ColumnCollectionUtil.ReplaceColumnType<JoinT["columns"], TableAliasT, ColumnNameT, NewTypeT>, JoinT["nullable"]>) : JoinT);
    function replaceColumnType<JoinT extends AnyJoin, TableAliasT extends string, ColumnNameT extends string, NewTypeT>(join: JoinT, tableAlias: TableAliasT, columnName: ColumnNameT, newAssertDelegate: sd.AssertDelegate<NewTypeT>): (ReplaceColumnType<JoinT, TableAliasT, ColumnNameT, NewTypeT>);
    type ReplaceNullable<JoinT extends AnyJoin, TableAliasT extends string, NullableT extends boolean> = (JoinT["table"]["alias"] extends TableAliasT ? (Join<JoinT["table"], JoinT["columns"], NullableT>) : JoinT);
    function replaceNullable<JoinT extends AnyJoin, TableAliasT extends string, NullableT extends boolean>(join: JoinT, tableAlias: TableAliasT, nullable: NullableT): (ReplaceNullable<JoinT, TableAliasT, NullableT>);
}
//# sourceMappingURL=util.d.ts.map