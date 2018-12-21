import * as sd from "schema-decorator";
import { Table } from "./table";
import { Tuple } from "../tuple";
import { ColumnMapUtil } from "../column-map";
import { FieldArrayUtil } from "../field-array";
export declare function tableFromFieldTuple<NameT extends string, FieldsT extends Tuple<sd.AnyField>>(name: NameT, fields: FieldsT): (Table<{
    readonly usedRef: {};
    readonly alias: NameT;
    readonly columns: ColumnMapUtil.FromFieldArray<NameT, FieldsT>;
    readonly autoIncrement: undefined;
    readonly generated: [];
    readonly isNullable: FieldArrayUtil.NullableNameUnion<FieldsT>[];
    readonly hasExplicitDefaultValue: [];
    readonly mutable: FieldsT[number]["name"][];
    readonly id: undefined;
    readonly candidateKeys: [];
    readonly parents: [];
    readonly insertAllowed: true;
    readonly deleteAllowed: true;
}>);
//# sourceMappingURL=from-field-tuple.d.ts.map