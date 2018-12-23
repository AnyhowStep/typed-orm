import {IAliasedTable} from "../../aliased-table";
import {ColumnRefUtil} from "../../../column-ref";
import {ColumnMapUtil} from "../../../column-map";

export type ToInterface<AliasedTableT extends IAliasedTable> = (
    IAliasedTable<{
        readonly usedRef : ColumnRefUtil.ToInterface<AliasedTableT["usedRef"]>;
        readonly alias : AliasedTableT["alias"];
        readonly columns : ColumnMapUtil.ToInterface<AliasedTableT["columns"]>;
    }>
);