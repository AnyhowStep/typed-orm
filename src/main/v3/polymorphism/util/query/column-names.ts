import {ITable} from "../../../table";
import {ColumnUtil} from "../../../column";
import {IsNullable, HasExplicitDefaultValue} from "../predicate";

export type ColumnNames<TableT extends ITable> = (
    ColumnUtil.Name.FromColumnMap<
        TableT["columns"] |
        TableT["parents"][number]["columns"]
    >
);
export type GeneratedColumnNames<TableT extends ITable> = (
    (TableT|TableT["parents"][number])["generated"][number]
);
export function uniqueGeneratedColumnNames (table : ITable) : string[] {
    const result = new Set<string>();
    for (let c of table.generated) {
        result.add(c);
    }
    for (let p of table.parents) {
        for (let c of p.generated) {
            result.add(c);
        }
    }
    return [...result];
}
export type NonGeneratedColumnNames<TableT extends ITable> = (
    Exclude<
        ColumnNames<TableT>,
        GeneratedColumnNames<TableT>
    >
);

export type OptionalColumnNames<TableT extends ITable> = (
    {
        [columnName in NonGeneratedColumnNames<TableT>] : (
            true extends (
                IsNullable<TableT, columnName> |
                HasExplicitDefaultValue<TableT, columnName>
            ) ?
            columnName :
            never
        )
    }[NonGeneratedColumnNames<TableT>]
);

export type RequiredColumnNames<TableT extends ITable> = (
    {
        [columnName in NonGeneratedColumnNames<TableT>] : (
            true extends (
                IsNullable<TableT, columnName> |
                HasExplicitDefaultValue<TableT, columnName>
            ) ?
            never :
            columnName
        )
    }[NonGeneratedColumnNames<TableT>]
);