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
        readonly usedRef : {};
        readonly alias : NameT;
        readonly name  : NameT;
        readonly columns : ColumnMapUtil.FromAssertMap<NameT, AssertMapT>;

        readonly autoIncrement : undefined;
        readonly generated : [];
        readonly isNullable : AssertMapUtil.NullableNameUnion<AssertMapT>[];
        readonly hasExplicitDefaultValue : [];
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
        readonly usedRef : {};
        readonly alias : NameT;
        readonly name  : NameT;
        readonly columns : ColumnMapUtil.FromFieldArray<NameT, FieldsT>;

        readonly autoIncrement : undefined;
        readonly generated : [];
        readonly isNullable : FieldArrayUtil.NullableNameUnion<FieldsT>[];
        readonly hasExplicitDefaultValue : [];
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
) : (
    Table<{
        readonly usedRef : TableT["usedRef"];
        readonly alias : TableT["alias"];
        readonly name  : TableT["name"];
        readonly columns : TableT["columns"];

        readonly autoIncrement : TableT["autoIncrement"];
        readonly generated : TableT["generated"];
        readonly isNullable : TableT["isNullable"];
        readonly hasExplicitDefaultValue : TableT["hasExplicitDefaultValue"];
        readonly mutable : TableT["mutable"];
        readonly id : TableT["id"];
        readonly candidateKeys : TableT["candidateKeys"];
        readonly parents : TableT["parents"];
        readonly insertAllowed : TableT["insertAllowed"];
        readonly deleteAllowed : TableT["deleteAllowed"];
    }>
);
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