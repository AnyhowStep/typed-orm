import { ITable, TableUtil } from "../../../table";
export declare type HasExplicitDefaultValue<TableT extends ITable, NameT extends string> = (TableUtil.HasExplicitDefaultValue<TableT["parents"][number], NameT> extends true ? true : false);
//# sourceMappingURL=has-explicit-default-value.d.ts.map