import {ITable} from "../../table";
import {ColumnUtil} from "../../../column";

//TODO-DEBATE Find better names
export type PolymorphicColumnNameUnion<TableT extends ITable> = (
    (ColumnUtil.FromColumnMap<TableT["columns"]>["name"]) |
    (ColumnUtil.FromColumnMap<TableT["parents"][number]["columns"]>["name"])
);
export type PolymorphicGeneratedUnion<TableT extends ITable> = (
    (TableT["generated"][number])|
    (TableT["parents"][number]["generated"][number])
);