import { ITable } from "../../../table";
import { HasColumnName } from "./parents-have-column-name";
import { TableAliases, FindTable } from "../query";
export declare type IsMutable<TableT extends ITable, NameT extends string> = (HasColumnName<TableT, NameT> extends true ? ({
    [tableAlias in TableAliases<TableT>]: (NameT extends keyof FindTable<TableT, tableAlias>["columns"] ? (NameT extends FindTable<TableT, tableAlias>["mutable"][number] ? true : false) : never);
}[TableAliases<TableT>] extends true ? true : false) : false);
export declare function isMutable<TableT extends ITable, NameT extends string>(table: TableT, name: NameT): IsMutable<TableT, NameT>;
//# sourceMappingURL=is-mutable.d.ts.map