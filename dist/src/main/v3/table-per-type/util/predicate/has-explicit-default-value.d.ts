import { ITable, TableUtil } from "../../../table";
import { ParentsHaveColumnName } from "./parents-have-column-name";
import { ParentAliases, FindParent } from "../query";
export declare type HasExplicitDefaultValue<TableT extends ITable, NameT extends string> = (ParentsHaveColumnName<TableT, NameT> extends true ? ({
    [tableAlias in ParentAliases<TableT>]: (NameT extends keyof FindParent<TableT, tableAlias>["columns"] ? (NameT extends FindParent<TableT, tableAlias>["hasExplicitDefaultValue"][number] ? true : false) : never);
}[ParentAliases<TableT>] extends true ? true : false) : TableUtil.HasExplicitDefaultValue<TableT, NameT>);
export declare function hasExplicitDefaultValue<TableT extends ITable, NameT extends string>(table: TableT, name: NameT): HasExplicitDefaultValue<TableT, NameT>;
