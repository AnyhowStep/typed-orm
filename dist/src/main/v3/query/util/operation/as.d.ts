import { AfterSelectClause } from "../predicate";
import { IAliasedTable } from "../../../aliased-table";
import { IJoin } from "../../../join";
import { ColumnRefUtil } from "../../../column-ref";
import { ColumnMapUtil } from "../../../column-map";
import { SelectItemArrayUtil } from "../../../select-item-array";
export declare type As<QueryT extends AfterSelectClause, AliasT extends string> = (IAliasedTable<{
    usedRef: (QueryT["_parentJoins"] extends IJoin[] ? ColumnRefUtil.FromJoinArray<QueryT["_parentJoins"]> : {});
    alias: AliasT;
    columns: ColumnMapUtil.FromSelectItemArray<QueryT["_selects"], AliasT>;
}>);
export declare type AssertAliasableQuery<QueryT extends AfterSelectClause> = (QueryT & (SelectItemArrayUtil.DuplicateColumnName<QueryT["_selects"]> extends never ? unknown : ["Duplicate column names not allowed in selects", SelectItemArrayUtil.DuplicateColumnName<QueryT["_selects"]>]));
export declare function as<QueryT extends AfterSelectClause, AliasT extends string>(query: AssertAliasableQuery<QueryT>, alias: AliasT): As<QueryT, AliasT>;
//# sourceMappingURL=as.d.ts.map