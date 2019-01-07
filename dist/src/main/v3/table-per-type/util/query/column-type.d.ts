import { ITable } from "../../../table";
export declare type ParentAliases<TableT extends ITable> = (TableT["parents"][number]["alias"]);
export declare type ParentAliasesExcept<TableT extends ITable, ExceptT extends string> = (Exclude<ParentAliases<TableT>, ExceptT>);
export declare type FindParent<TableT extends ITable, AliasT extends string> = (Extract<TableT["parents"][number], {
    alias: AliasT;
}>);
export declare type TableAliases<TableT extends ITable> = ((TableT | TableT["parents"][number])["alias"]);
export declare type TableAliasesExcept<TableT extends ITable, ExceptT extends string> = (Exclude<TableAliases<TableT>, ExceptT>);
export declare type FindTable<TableT extends ITable, AliasT extends string> = (Extract<(TableT | TableT["parents"][number]), {
    alias: AliasT;
}>);
export declare type ColumnType<TableT extends ITable, NameT extends string> = ({
    [tableAlias in TableAliases<TableT>]: (NameT extends keyof FindTable<TableT, tableAlias>["columns"] ? ({
        [otherTableAlias in TableAliasesExcept<TableT, tableAlias>]: (NameT extends keyof FindTable<TableT, otherTableAlias>["columns"] ? ((ReturnType<FindTable<TableT, tableAlias>["columns"][NameT]["assertDelegate"]>) extends (ReturnType<FindTable<TableT, otherTableAlias>["columns"][NameT]["assertDelegate"]>) ? true : false) : true);
    }[TableAliasesExcept<TableT, tableAlias>] extends true ? ReturnType<FindTable<TableT, tableAlias>["columns"][NameT]["assertDelegate"]> : never) : never);
}[TableAliases<TableT>]);
//# sourceMappingURL=column-type.d.ts.map