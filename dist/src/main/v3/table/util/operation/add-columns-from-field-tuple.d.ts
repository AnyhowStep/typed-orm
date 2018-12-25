import * as sd from "schema-decorator";
import { Table, ITable } from "../../table";
import { ColumnMapUtil } from "../../../column-map";
import { ColumnUtil } from "../../../column";
export declare type AddColumnsFromFieldTuple<TableT extends ITable, FieldsT extends sd.AnyField[]> = (Table<{
    readonly usedRef: TableT["usedRef"];
    readonly alias: TableT["alias"];
    readonly columns: ColumnMapUtil.Intersect<TableT["columns"], ColumnMapUtil.FromFieldArray<TableT["alias"], FieldsT>>;
    readonly autoIncrement: TableT["autoIncrement"];
    readonly id: TableT["id"];
    readonly primaryKey: TableT["primaryKey"];
    readonly candidateKeys: TableT["candidateKeys"];
    readonly generated: TableT["generated"];
    readonly isNullable: ColumnUtil.Name.NullableFromColumnMap<ColumnMapUtil.Intersect<TableT["columns"], ColumnMapUtil.FromFieldArray<TableT["alias"], FieldsT>>>[];
    readonly hasExplicitDefaultValue: TableT["hasExplicitDefaultValue"];
    readonly mutable: TableT["mutable"];
    readonly parents: TableT["parents"];
    readonly insertAllowed: TableT["insertAllowed"];
    readonly deleteAllowed: TableT["deleteAllowed"];
}>);
export declare function addColumnsFromFieldTuple<TableT extends ITable, FieldsT extends sd.AnyField[]>(table: TableT, fields: FieldsT): (AddColumnsFromFieldTuple<TableT, FieldsT>);
//# sourceMappingURL=add-columns-from-field-tuple.d.ts.map