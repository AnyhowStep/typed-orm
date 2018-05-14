import * as d from "../declaration";
import * as sd from "schema-decorator";
import {Column} from "./column";
import {spread} from "@anyhowstep/type-util";

export function toNullableColumnReferences<ColumnReferencesT extends d.ColumnReferences> (
    columnReferences : ColumnReferencesT
) : d.ToNullableColumnReferences<ColumnReferencesT> {
    const result : d.ToNullableColumnReferences<ColumnReferencesT> = {} as any;
    for (let table in columnReferences) {
        if (!columnReferences.hasOwnProperty(table)) {
            continue;
        }
        for (let column in columnReferences[table]) {
            if (!columnReferences[table].hasOwnProperty(column)) {
                continue;
            }
            const c = columnReferences[table][column];
            result[table][column] = new Column(
                c.table,
                c.name,
                sd.nullable(c.assertDelegate)
            ) as any;
        }
    }
    return result;
}

export function copyReferences<ColumnReferencesT extends d.ColumnReferences> (
    columnReferences : ColumnReferencesT
) : ColumnReferencesT {
    const result = spread(columnReferences);
    for (let table in columnReferences) {
        if (columnReferences.hasOwnProperty(table)) {
            result[table] = spread(result[table]);
        }
    }
    return result;
}

export function replaceColumnOfReference<
    ColumnReferencesT extends d.ColumnReferences,
    TableNameT extends string,
    NameT extends string,
    NewTypeT
> (
    columnReferences : ColumnReferencesT,
    newColumn : Column<TableNameT, NameT, NewTypeT>
) : d.ReplaceColumnOfReference<
    ColumnReferencesT,
    TableNameT,
    NameT,
    NewTypeT
> {
    if (
        columnReferences[newColumn.table] != undefined &&
        columnReferences[newColumn.table][newColumn.name] != undefined
    ) {
        const curColumn = columnReferences[newColumn.table][newColumn.name];
        if (curColumn.table == newColumn.table && curColumn.name == newColumn.name) {
            //Create a copy
            columnReferences = copyReferences(columnReferences);
            columnReferences[newColumn.table][newColumn.name] = newColumn;
            return columnReferences as any;
        } else {
            return columnReferences as any;
        }
    } else {
        //No column to replace
        return columnReferences as any;
    }
}
