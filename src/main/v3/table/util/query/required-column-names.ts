import {ITable} from "../../table";
import {ColumnMapUtil} from "../../../column-map";
import {columnNames} from "./column-names";

export type RequiredColumnNames<TableT extends ITable> = (
    Exclude<
        ColumnMapUtil.ColumnNames<TableT["columns"]>,
        (
            TableT["generated"][number] |
            TableT["isNullable"][number] |
            TableT["hasExplicitDefaultValue"][number]
        )
    >
);
export function isRequired<TableT extends ITable> (
    table : TableT,
    columnName : string
) : columnName is RequiredColumnNames<TableT> {
    return (
        (columnName in table.columns) &&
        table.generated.indexOf(columnName) < 0 &&
        table.isNullable.indexOf(columnName) < 0 &&
        table.hasExplicitDefaultValue.indexOf(columnName) < 0
    );
}
export function requiredColumnNames<TableT extends ITable> (
    table : TableT
) : RequiredColumnNames<TableT>[] {
    return columnNames(table).filter(
        columnName => isRequired(table, columnName)
    ) as any;
}