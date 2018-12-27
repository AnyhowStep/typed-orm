import { ITable } from "../../table";
export declare type IsNullable<TableT extends ITable, NameT extends string> = (TableT extends ITable ? (NameT extends TableT["isNullable"][number] ? true : false) : never);
//# sourceMappingURL=is-nullable.d.ts.map