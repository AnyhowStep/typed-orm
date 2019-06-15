import * as sd from "type-mapping";
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
        readonly [columnName in FieldsT[number]["__name"]] : (
            Column<{
                tableAlias : TableAliasT,
                name : columnName,
                assertDelegate : sd.SafeMapper<sd.OutputOf<
                    Extract<FieldsT[number], sd.Name<columnName>>
                >>
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
        result[field.__name] = new Column({
            tableAlias : tableAlias,
            name : field.__name,
            assertDelegate : field,
        });
    }
    return result as FromFieldArray<TableAliasT, FieldsT>;
}