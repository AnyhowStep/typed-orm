import { AfterSelectClause, OneSelectItemQuery, ZeroOrOneRowQuery } from "../predicate";
import { IAliasedTable } from "../../../aliased-table";
import { IJoin } from "../../../join";
import { ColumnRefUtil } from "../../../column-ref";
import { ColumnMapUtil } from "../../../column-map";
import { SelectItemArrayUtil } from "../../../select-item-array";
import { AssertDelegate } from "../query";
import { SelectItem } from "../../../select-item";
import { ALIASED } from "../../../constants";
import { ASC, DESC } from "../../../order";
import { QueryTree } from "../../../query-tree";
export declare type As<QueryT extends {
    _parentJoins: IJoin[] | undefined;
    _selects: SelectItem[];
}, AliasT extends string> = (IAliasedTable<{
    usedRef: (QueryT["_parentJoins"] extends IJoin[] ? ColumnRefUtil.FromJoinArray<QueryT["_parentJoins"]> : {});
    alias: AliasT;
    columns: ColumnMapUtil.FromSelectItemArray<QueryT["_selects"], AliasT>;
}> & (QueryT extends (OneSelectItemQuery<any> & ZeroOrOneRowQuery) ? {
    assertDelegate: AssertDelegate<QueryT>;
    tableAlias: typeof ALIASED;
    asc: () => [{
        usedRef: (QueryT["_parentJoins"] extends IJoin[] ? ColumnRefUtil.FromJoinArray<Extract<QueryT["_parentJoins"], IJoin[]>> : {});
        assertDelegate: AssertDelegate<QueryT>;
        queryTree: QueryTree;
    }, typeof ASC];
    desc: () => [{
        usedRef: (QueryT["_parentJoins"] extends IJoin[] ? ColumnRefUtil.FromJoinArray<Extract<QueryT["_parentJoins"], IJoin[]>> : {});
        assertDelegate: AssertDelegate<QueryT>;
        queryTree: QueryTree;
    }, typeof DESC];
} : unknown));
export declare type AssertAliasableQuery<QueryT extends AfterSelectClause> = (QueryT & (SelectItemArrayUtil.DuplicateColumnName<QueryT["_selects"]> extends never ? unknown : ["Duplicate column names not allowed in selects", SelectItemArrayUtil.DuplicateColumnName<QueryT["_selects"]>]));
export declare function as<QueryT extends AfterSelectClause, AliasT extends string>(query: AssertAliasableQuery<QueryT>, alias: AliasT): As<QueryT, AliasT>;
