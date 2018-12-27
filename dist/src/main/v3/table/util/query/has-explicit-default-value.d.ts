import { ITable } from "../../table";
export declare type HasExplicitDefaultValue<TableT extends ITable, NameT extends string> = (TableT extends ITable ? (NameT extends TableT["hasExplicitDefaultValue"][number] ? true : false) : never);
//# sourceMappingURL=has-explicit-default-value.d.ts.map