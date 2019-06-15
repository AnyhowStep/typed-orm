import * as sd from "type-mapping";
import {TableWithPk} from "../table";
import {ColumnMapUtil} from "../column-map";
import {TypeMapUtil} from "../type-map";

export type PrimaryKey<TableT extends TableWithPk> = (
    TableT extends TableWithPk ?
    TypeMapUtil.FromColumnMap<
        Pick<
            TableT["columns"],
            TableT["primaryKey"][number]
        >
    > :
    never
);
export namespace PrimaryKeyUtil {
    export type AssertDelegate<TableT extends TableWithPk> = (
        sd.SafeMapper<PrimaryKey<TableT>>
    );
    export function assertDelegate<TableT extends TableWithPk> (
        table : TableT
    ) : (
        AssertDelegate<TableT>
    ) {
        return ColumnMapUtil.assertDelegate(
            ColumnMapUtil.pick(table.columns, table.primaryKey)
        ) as any;
    }
}