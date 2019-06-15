import * as sd from "type-mapping";
import { TableWithPk } from "../table";
import { TypeMapUtil } from "../type-map";
export declare type PrimaryKey<TableT extends TableWithPk> = (TableT extends TableWithPk ? TypeMapUtil.FromColumnMap<Pick<TableT["columns"], TableT["primaryKey"][number]>> : never);
export declare namespace PrimaryKeyUtil {
    type AssertDelegate<TableT extends TableWithPk> = (sd.SafeMapper<PrimaryKey<TableT>>);
    function assertDelegate<TableT extends TableWithPk>(table: TableT): (AssertDelegate<TableT>);
}
