import * as sd from "schema-decorator";
import { Table, ITable } from "./table";
import { Tuple } from "../tuple";
import { ColumnMapUtil } from "../column-map";
import { FieldArrayUtil } from "../field-array";
import { AssertMap } from "../assert-map";
import { FromAssertMap } from "./util";
export declare function table<NameT extends string, AssertMapT extends AssertMap>(name: NameT, assertMap: AssertMapT): (FromAssertMap<NameT, AssertMapT>);
export declare function table<NameT extends string, FieldsT extends Tuple<sd.AnyField>>(name: NameT, fields: FieldsT): (Table<{
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
export declare function table<TableT extends ITable>(table: TableT): (Table<{
    readonly usedRef: TableT["usedRef"];
    readonly alias: TableT["alias"];
    readonly columns: TableT["columns"];
    readonly autoIncrement: TableT["autoIncrement"];
    readonly generated: TableT["generated"];
    readonly isNullable: TableT["isNullable"];
    readonly hasExplicitDefaultValue: TableT["hasExplicitDefaultValue"];
    readonly mutable: TableT["mutable"];
    readonly id: TableT["id"];
    readonly candidateKeys: TableT["candidateKeys"];
    readonly parents: TableT["parents"];
    readonly insertAllowed: TableT["insertAllowed"];
    readonly deleteAllowed: TableT["deleteAllowed"];
}>);
//# sourceMappingURL=instantiate.d.ts.map