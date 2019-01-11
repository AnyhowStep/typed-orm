import { ColumnMap } from "../../column-map";
export declare type FindWithTableAlias<ColumnMapT extends ColumnMap, TableAliasT extends string> = (ColumnMapT extends ColumnMap ? Extract<ColumnMapT[Extract<keyof ColumnMapT, string>], {
    tableAlias: TableAliasT;
}> : never);
//# sourceMappingURL=find-with-table-alias.d.ts.map