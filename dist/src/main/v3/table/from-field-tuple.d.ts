import * as sd from "schema-decorator";
import { Table } from "./table";
import { Tuple } from "../tuple";
import { ColumnMapUtil } from "../column-map";
import { FieldArrayUtil } from "../field-array";
export declare function tableFromFieldTuple<NameT extends string, FieldsT extends Tuple<sd.AnyField>>(name: NameT, fields: FieldsT): (Table<{
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
//# sourceMappingURL=from-field-tuple.d.ts.map