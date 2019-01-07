import {ITable} from "../../../table";
import {ParentColumnNames, ColumnNames} from "../query";

export type ParentsHaveColumnName<
    TableT extends ITable,
    NameT extends string
> = (
    NameT extends ParentColumnNames<TableT> ?
    true :
    false
);
export function parentsHaveColumnName<
    TableT extends ITable,
    NameT extends string
> (
    table : TableT,
    columnName : NameT
) : ParentsHaveColumnName<TableT, NameT> {
    for (let p of table.parents) {
        if (columnName in p.columns) {
            return true as ParentsHaveColumnName<TableT, NameT>;
        }
    }
    return false as ParentsHaveColumnName<TableT, NameT>;
}

export type HasColumnName<
    TableT extends ITable,
    NameT extends string
> = (
    NameT extends ColumnNames<TableT> ?
    true :
    false
);
export function hasColumnName<
    TableT extends ITable,
    NameT extends string
> (
    table : TableT,
    columnName : NameT
) : HasColumnName<TableT, NameT> {
    if (!(columnName in table.columns)) {
        return false as HasColumnName<TableT, NameT>;
    }
    return parentsHaveColumnName(
        table,
        columnName
    ) as boolean as HasColumnName<TableT, NameT>;
}