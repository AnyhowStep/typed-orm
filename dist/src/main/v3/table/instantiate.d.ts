import * as sd from "schema-decorator";
import { Table, ITable } from "./table";
import { Tuple } from "../tuple";
import { ColumnMapUtil } from "../column-map";
import { FieldArrayUtil } from "../field-array";
import { AssertMap, AssertMapUtil } from "../assert-map";
export declare function table<NameT extends string, AssertMapT extends AssertMap>(name: NameT, assertMap: AssertMapT): (Table<{
    readonly alias: NameT;
    readonly name: NameT;
    readonly columns: ColumnMapUtil.FromAssertMap<NameT, AssertMapT>;
    readonly autoIncrement: undefined;
    readonly generated: [];
    readonly hasDefaultValue: AssertMapUtil.NullableNameUnion<AssertMapT>[];
    readonly mutable: Extract<keyof AssertMapT, string>[];
    readonly id: undefined;
    readonly candidateKeys: [];
    readonly parents: [];
    readonly insertAllowed: true;
    readonly deleteAllowed: true;
}>);
export declare function table<NameT extends string, FieldsT extends Tuple<sd.AnyField>>(name: NameT, fields: FieldsT): (Table<{
    readonly alias: NameT;
    readonly name: NameT;
    readonly columns: ColumnMapUtil.FromFieldArray<NameT, FieldsT>;
    readonly autoIncrement: undefined;
    readonly generated: [];
    readonly hasDefaultValue: FieldArrayUtil.NullableNameUnion<FieldsT>[];
    readonly mutable: FieldsT[number]["name"][];
    readonly id: undefined;
    readonly candidateKeys: [];
    readonly parents: [];
    readonly insertAllowed: true;
    readonly deleteAllowed: true;
}>);
export declare function table<TableT extends ITable>(table: TableT): Table<TableT>;
//# sourceMappingURL=instantiate.d.ts.map