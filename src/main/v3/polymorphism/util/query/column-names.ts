import {ITable} from "../../../table";
import {ColumnUtil} from "../../../column";
import {IsNullable, HasExplicitDefaultValue, isNullable, hasExplicitDefaultValue, IsMutable, isMutable} from "../predicate";

export type ParentColumnNames<TableT extends ITable> = (
    ColumnUtil.Name.FromColumnMap<
        TableT["parents"][number]["columns"]
    >
);
export type ColumnNames<TableT extends ITable> = (
    ColumnUtil.Name.FromColumnMap<
        TableT["columns"] |
        TableT["parents"][number]["columns"]
    >
);
export function uniqueColumnNames<TableT extends ITable> (
    table : TableT
) : Set<ColumnNames<TableT>> {
    const result = new Set<string>();
    for (let c in table.columns) {
        result.add(c);
    }
    for (let p of table.parents) {
        for (let c in p.columns) {
            result.add(c);
        }
    }
    return result as any;
}
export type GeneratedColumnNames<TableT extends ITable> = (
    (TableT|TableT["parents"][number])["generated"][number]
);
export function uniqueGeneratedColumnNames<TableT extends ITable> (
    table : TableT
) : Set<GeneratedColumnNames<TableT>> {
    const result = new Set<string>();
    for (let c of table.generated) {
        result.add(c);
    }
    for (let p of table.parents) {
        for (let c of p.generated) {
            result.add(c);
        }
    }
    return result;
}
export type NonGeneratedColumnNames<TableT extends ITable> = (
    Exclude<
        ColumnNames<TableT>,
        GeneratedColumnNames<TableT>
    >
);
export function uniqueNonGeneratedColumnNames<TableT extends ITable> (
    table : TableT
) : Set<NonGeneratedColumnNames<TableT>> {
    const columnNames = uniqueColumnNames(table);
    const generatedColumnNames = uniqueGeneratedColumnNames(table);
    const result = new Set<string>();
    for (let c of columnNames) {
        if (!generatedColumnNames.has(c)) {
            result.add(c);
        }
    }
    return result as any;
}

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
export function uniqueOptionalColumnNames<TableT extends ITable> (
    table : TableT
) : Set<OptionalColumnNames<TableT>> {
    const result = new Set<string>();
    for (let c of uniqueNonGeneratedColumnNames(table)) {
        if (isNullable(table, c) || hasExplicitDefaultValue(table, c)) {
            result.add(c);
        }
    }
    return result as any;
}

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
export function uniqueRequiredColumnNames<TableT extends ITable> (
    table : TableT
) : Set<RequiredColumnNames<TableT>> {
    const result = new Set<string>();
    for (let c of uniqueNonGeneratedColumnNames(table)) {
        if (!isNullable(table, c) && !hasExplicitDefaultValue(table, c)) {
            result.add(c);
        }
    }
    return result as any;
}

export type MutableColumnNames<TableT extends ITable> = (
    {
        [columnName in ColumnNames<TableT>] : (
            IsMutable<TableT, columnName> extends true ?
            columnName :
            never
        )
    }[ColumnNames<TableT>]
);
export function uniqueMutableColumnNames<TableT extends ITable> (
    table : TableT
) : Set<MutableColumnNames<TableT>> {
    const result = new Set<string>();
    for (let c of uniqueColumnNames(table)) {
        if (isMutable(table, c)) {
            result.add(c);
        }
    }
    return result as any;
}