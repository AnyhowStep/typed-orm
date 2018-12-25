import { ITable } from "../../table";
import { ColumnUtil } from "../../../column";
export declare type PolymorphicColumnNameUnion<TableT extends ITable> = ((ColumnUtil.FromColumnMap<TableT["columns"]>["name"]) | (ColumnUtil.FromColumnMap<TableT["parents"][number]["columns"]>["name"]));
export declare type PolymorphicGeneratedUnion<TableT extends ITable> = ((TableT["generated"][number]) | (TableT["parents"][number]["generated"][number]));
//# sourceMappingURL=index.d.ts.map