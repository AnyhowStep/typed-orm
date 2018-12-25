import * as sd from "schema-decorator";
import {ITable} from "./table";
import {Tuple} from "../tuple";
import {AssertMap} from "../assert-map";
import {FromAssertMap, fromAssertMap} from "./util";
import {FromFieldTuple, fromFieldTuple} from "./util";
import {FromTable, fromTable} from "./util";

export function table<
    NameT extends string,
    AssertMapT extends AssertMap
> (
    name : NameT,
    assertMap : AssertMapT
) : (
    FromAssertMap<NameT, AssertMapT>
);
export function table<
    NameT extends string,
    FieldsT extends Tuple<sd.AnyField>
> (
    name : NameT,
    fields : FieldsT
) : (
    FromFieldTuple<NameT, FieldsT>
);
export function table<TableT extends ITable> (
    table : TableT
) : (
    FromTable<TableT>
);
export function table (arg0 : any, arg1? : any) {
    if (arg1 == undefined) {
        return fromTable(arg0);
    }

    if (arg1 instanceof Array) {
        return fromFieldTuple(arg0, arg1 as any);
    } else {
        return fromAssertMap(arg0, arg1);
    }
}