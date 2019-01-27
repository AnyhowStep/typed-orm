import {IAliasedTable} from "../../aliased-table";
import {ColumnUtil} from "../../../column";
import {ColumnMapUtil} from "../../../column-map";

export type ToInterface<AliasedTableT extends IAliasedTable> = (
    IAliasedTable<{
        readonly usedColumns : ColumnUtil.Array.ToInterface<AliasedTableT["usedColumns"]>;
        readonly alias : AliasedTableT["alias"];
        readonly columns : ColumnMapUtil.ToInterface<AliasedTableT["columns"]>;
    }>
);