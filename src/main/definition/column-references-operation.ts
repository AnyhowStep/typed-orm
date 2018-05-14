import * as d from "../declaration";
import * as sd from "schema-decorator";
import {Column} from "./column";

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
