import { Table, ITable } from "../../table";
import { AssertMap } from "../../../assert-map";
import { ColumnMapUtil } from "../../../column-map";
import { ColumnUtil } from "../../../column";
export declare type AddColumnsFromAssertMap<TableT extends ITable, AssertMapT extends AssertMap> = (Table<{
    readonly usedRef: TableT["usedRef"];
    readonly alias: TableT["alias"];
    readonly columns: ColumnMapUtil.Intersect<TableT["columns"], ColumnMapUtil.FromAssertMap<TableT["alias"], AssertMapT>>;
    readonly autoIncrement: TableT["autoIncrement"];
    readonly id: TableT["id"];
    readonly primaryKey: TableT["primaryKey"];
    readonly candidateKeys: TableT["candidateKeys"];
    readonly generated: TableT["generated"];
    readonly isNullable: ColumnUtil.Name.NullableFromColumnMap<ColumnMapUtil.Intersect<TableT["columns"], ColumnMapUtil.FromAssertMap<TableT["alias"], AssertMapT>>>[];
    readonly hasExplicitDefaultValue: TableT["hasExplicitDefaultValue"];
    readonly mutable: TableT["mutable"];
    readonly parents: TableT["parents"];
    readonly insertAllowed: TableT["insertAllowed"];
    readonly deleteAllowed: TableT["deleteAllowed"];
}>);
export declare function addColumnsFromAssertMap<TableT extends ITable, AssertMapT extends AssertMap>(table: TableT, assertMap: AssertMapT): (AddColumnsFromAssertMap<TableT, AssertMapT>);
//# sourceMappingURL=add-columns-from-assert-map.d.ts.map