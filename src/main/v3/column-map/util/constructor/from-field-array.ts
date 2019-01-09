import * as sd from "schema-decorator";
import {Writable} from "../../../type";
import {ColumnMap} from "../../column-map";
import {Column} from "../../../column";

/*
    In general, having any[] -> {} conversions
    requires more care.
*/
export type FromFieldArray<
    TableAliasT extends string,
    FieldsT extends sd.AnyField[]
> = (
    FieldsT[number] extends never ?
    {} :
    {
        readonly [columnName in FieldsT[number]["name"]] : (
            Column<{
                tableAlias : TableAliasT,
                name : columnName,
                assertDelegate : Extract<FieldsT[number], { name : columnName }>["assertDelegate"]
            }>
        )
    }
);
export function fromFieldArray<
    TableAliasT extends string,
    FieldsT extends sd.AnyField[]
> (
    tableAlias : TableAliasT,
    fields : FieldsT
) : (
    FromFieldArray<TableAliasT, FieldsT>
) {
    const result : Writable<ColumnMap> = {};
    for (let field of fields) {
        result[field.name] = new Column({
            tableAlias : tableAlias,
            name : field.name,
            assertDelegate : field.assertDelegate,
        });
    }
    return result as FromFieldArray<TableAliasT, FieldsT>;
}