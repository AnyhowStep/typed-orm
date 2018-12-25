import * as sd from "schema-decorator";
import {ITable} from "../../table";
import {AssertMap} from "../../../assert-map";
import {AddColumnsFromAssertMap, addColumnsFromAssertMap} from "./add-columns-from-assert-map";
import {AddColumnsFromFieldTuple, addColumnsFromFieldTuple} from "./add-columns-from-field-tuple";

export function addColumns<
    TableT extends ITable,
    FieldsT extends sd.AnyField[]
> (
    table : TableT,
    fields : FieldsT
) : (
    AddColumnsFromFieldTuple<TableT, FieldsT>
);
export function addColumns<
    TableT extends ITable,
    AssertMapT extends AssertMap
> (
    table : TableT,
    assertMap : AssertMapT
) : (
    AddColumnsFromAssertMap<TableT, AssertMapT>
);
export function addColumns (table : ITable, rawColumns : any) {
    if (rawColumns instanceof Array) {
        return addColumnsFromFieldTuple(table, rawColumns);
    } else {
        return addColumnsFromAssertMap(table, rawColumns);
    }
}