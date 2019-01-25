import { ITable } from "../../../table";
import { HasColumnName } from "./parents-have-column-name";
import { TableAliases, FindTable } from "../query";
export declare type IsNullable<TableT extends ITable, NameT extends string> = (HasColumnName<TableT, NameT> extends true ? ({
    [tableAlias in TableAliases<TableT>]: (NameT extends keyof FindTable<TableT, tableAlias>["columns"] ? (NameT extends FindTable<TableT, tableAlias>["isNullable"][number] ? true : false) : never);
}[TableAliases<TableT>] extends true ? true : false) : false);
export declare function isNullable<TableT extends ITable, NameT extends string>(table: TableT, name: NameT): IsNullable<TableT, NameT>;
