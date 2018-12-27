import {ITable} from "../../table";
import {ColumnUtil} from "../../../column";

export type RequiredColumnNames<TableT extends ITable> = (
    Exclude<
        ColumnUtil.Name.FromColumnMap<TableT["columns"]>,
        (
            TableT["generated"][number] |
            TableT["isNullable"][number] |
            TableT["hasExplicitDefaultValue"][number]
        )
    >
);
export function isRequired (table : ITable, columnName : string) : boolean {
    return (
        (columnName in table.columns) &&
        table.generated.indexOf(columnName) < 0 &&
        table.isNullable.indexOf(columnName) < 0 &&
        table.hasExplicitDefaultValue.indexOf(columnName) < 0
    );
}