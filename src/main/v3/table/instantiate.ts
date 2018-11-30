import * as sd from "schema-decorator";
import {Table, ITable} from "./table";
import {Tuple} from "../tuple";
import {ColumnMapUtil} from "../column-map";
import {FieldArrayUtil} from "../field-array";
import {AssertMap, AssertMapUtil} from "../assert-map";
import {tableFromAssertMap} from "./from-assert-map";
import {tableFromFieldTuple} from "./from-field-tuple";
import {tableFromTable} from "./from-table";

export function table<
    NameT extends string,
    AssertMapT extends AssertMap
> (
    name : NameT,
    assertMap : AssertMapT
) : (
    Table<{
        readonly alias : NameT;
        readonly name  : NameT;
        readonly columns : ColumnMapUtil.FromAssertMap<NameT, AssertMapT>;

        readonly autoIncrement : undefined;
        readonly generated : [];
        readonly hasDefaultValue : AssertMapUtil.NullableNameUnion<AssertMapT>[];
        readonly mutable : Extract<keyof AssertMapT, string>[];
        readonly id : undefined;
        readonly candidateKeys : [];
        readonly parents : [];
        readonly insertAllowed : true;
        readonly deleteAllowed : true;
    }>
);
export function table<
    NameT extends string,
    FieldsT extends Tuple<sd.AnyField>
> (
    name : NameT,
    fields : FieldsT
) : (
    Table<{
        readonly alias : NameT;
        readonly name  : NameT;
        readonly columns : ColumnMapUtil.FromFieldArray<NameT, FieldsT>;

        readonly autoIncrement : undefined;
        readonly generated : [];
        readonly hasDefaultValue : FieldArrayUtil.NullableNameUnion<FieldsT>[];
        readonly mutable : FieldsT[number]["name"][];
        readonly id : undefined;
        readonly candidateKeys : [];
        readonly parents : [];
        readonly insertAllowed : true;
        readonly deleteAllowed : true;
    }>
);
export function table<TableT extends ITable> (
    table : TableT
) : Table<TableT>;
export function table (arg0 : any, arg1? : any) {
    if (arg1 == undefined) {
        return tableFromTable(arg0);
    }

    if (arg1 instanceof Array) {
        return tableFromFieldTuple(arg0, arg1 as any);
    } else {
        return tableFromAssertMap(arg0, arg1);
    }
}