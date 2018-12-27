import {ITable} from "../../table";

export type OptionalColumnNames<TableT extends ITable> = (
    Exclude<
        (
            TableT["isNullable"][number] |
            TableT["hasExplicitDefaultValue"][number]
        ),
        (
            TableT["generated"][number]
        )
    >
);
export function isOptional (table : ITable, columnName : string) : boolean {
    return (
        (
            table.isNullable.indexOf(columnName) >= 0 ||
            table.hasExplicitDefaultValue.indexOf(columnName) >= 0
        ) &&
        table.generated.indexOf(columnName) < 0
    );
}