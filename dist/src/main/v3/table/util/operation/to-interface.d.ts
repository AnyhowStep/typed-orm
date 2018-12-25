import { ITable } from "../../table";
import { ColumnRefUtil } from "../../../column-ref";
import { ColumnMapUtil } from "../../../column-map";
export declare type ToInterface<TableT extends ITable> = (ITable<{
    readonly usedRef: ColumnRefUtil.ToInterface<TableT["usedRef"]>;
    readonly alias: TableT["alias"];
    readonly columns: ColumnMapUtil.ToInterface<TableT["columns"]>;
    readonly autoIncrement: TableT["autoIncrement"];
    readonly id: TableT["id"];
    readonly primaryKey: TableT["primaryKey"];
    readonly candidateKeys: TableT["candidateKeys"];
    readonly generated: TableT["generated"];
    readonly isNullable: TableT["isNullable"];
    readonly hasExplicitDefaultValue: TableT["hasExplicitDefaultValue"];
    readonly mutable: TableT["mutable"];
    readonly parents: ToInterface<TableT["parents"][number]>[];
    readonly insertAllowed: TableT["insertAllowed"];
    readonly deleteAllowed: TableT["deleteAllowed"];
}>);
//# sourceMappingURL=to-interface.d.ts.map