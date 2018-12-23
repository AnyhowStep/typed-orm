import { IAliasedTable } from "../../aliased-table";
import { ColumnRefUtil } from "../../../column-ref";
import { ColumnMapUtil } from "../../../column-map";
export declare type ToInterface<AliasedTableT extends IAliasedTable> = (IAliasedTable<{
    readonly usedRef: ColumnRefUtil.ToInterface<AliasedTableT["usedRef"]>;
    readonly alias: AliasedTableT["alias"];
    readonly columns: ColumnMapUtil.ToInterface<AliasedTableT["columns"]>;
}>);
//# sourceMappingURL=to-interface.d.ts.map