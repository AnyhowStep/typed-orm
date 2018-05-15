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
            if (result[table] == undefined) {
                result[table] = {} as any;
            }
            result[table][column] = new Column(
                c.table,
                c.name,
                sd.nullable(c.assertDelegate)
            ) as any;
        }
    }
    return result;
}

export function copyReferences<ColumnReferencesT extends d.ColumnReferences|d.ExprUsedColumns<any>> (
    columnReferences : ColumnReferencesT
) : ColumnReferencesT {
    const result = spread(columnReferences);
    for (let table in columnReferences) {
        if (columnReferences.hasOwnProperty(table)) {
            result[table] = spread(result[table] as any);
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

export function isPartialColumnReferences<
    ColumnReferencesT extends d.ColumnReferences
> (
    columnReferences : ColumnReferencesT,
    mixed : any
) : mixed is d.ToPartialColumnReferences<ColumnReferencesT> {
    if (!(mixed instanceof Object)) {
        return false;
    }
    for (let table in mixed) {
        if (!mixed.hasOwnProperty(table)) {
            continue;
        }
        if (columnReferences[table] == undefined) {
            //Is using table that does not exist in references
            return false;
        }
        for (let name in mixed[table]) {
            if (!mixed[table].hasOwnProperty(name)) {
                continue;
            }
            if (columnReferences[table][name] == undefined) {
                //Is using column that does not exist in references
                return false;
            }
        }
    }
    return true;
}

export function combineReferences<
    T extends d.ColumnReferences|d.ExprUsedColumns<any>,
    U extends d.ColumnReferences|d.ExprUsedColumns<any>,
> (t : T, u : U) : T & U {
    const result : any = copyReferences(t);
    for (let table in u) {
        for (let name in u[table]) {
            if (result[table] == undefined) {
                result[table] = {};
            }
            result[table][name] = u[table][name];
        }
    }
    return result;
}

export function columnReferencesToSchema<
    ColumnReferencesT extends d.ColumnReferences
> (columnReferences : ColumnReferencesT) : (
    sd.AssertDelegate<d.ColumnReferencesToSchema<ColumnReferencesT>>
) {
    const result = {} as any;
    for (let table in columnReferences) {
        const fields = {} as any;
        for (let column in columnReferences[table]) {
            const c = columnReferences[table][column];
            fields[c.name] = c.assertDelegate;
        }
        result[table] = sd.toSchema(fields);
    }
    return sd.toSchema(result) as any;
}
