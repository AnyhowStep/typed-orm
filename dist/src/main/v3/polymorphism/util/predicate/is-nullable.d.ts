import { ITable, TableUtil } from "../../../table";
export declare type IsNullable<TableT extends ITable, NameT extends string> = (TableUtil.IsNullable<TableT | TableT["parents"][number], NameT> extends true ? true : false);
//# sourceMappingURL=is-nullable.d.ts.map