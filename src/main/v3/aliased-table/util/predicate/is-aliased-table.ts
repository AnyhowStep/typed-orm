import {IAliasedTable} from "../../aliased-table";
import {ColumnMapUtil} from "../../../column-map";
import {ColumnRefUtil} from "../../../column-ref";
import {QueryTreeUtil} from "../../../query-tree";

export function isAliasedTable (raw : any) : raw is IAliasedTable {
    return (
        raw != undefined &&
        (raw instanceof Object) &&
        ("usedRef" in raw) &&
        ("alias" in raw) &&
        ("columns" in raw) &&
        ("unaliasedQuery" in raw) &&

        ColumnRefUtil.isColumnRef(raw.usedRef) &&
        (typeof raw.alias == "string") &&
        ColumnMapUtil.isColumnMap(raw.columns) &&
        QueryTreeUtil.isQueryTree(raw.unaliasedQuery)
    );
}