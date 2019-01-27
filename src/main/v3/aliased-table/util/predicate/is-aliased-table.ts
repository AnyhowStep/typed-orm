import {IAliasedTable} from "../../aliased-table";
import {ColumnMapUtil} from "../../../column-map";
import {ColumnUtil} from "../../../column";
import {QueryTreeUtil} from "../../../query-tree";

export function isAliasedTable (raw : any) : raw is IAliasedTable {
    return (
        raw != undefined &&
        (raw instanceof Object) &&
        ("usedColumns" in raw) &&
        ("alias" in raw) &&
        ("columns" in raw) &&
        ("unaliasedQuery" in raw) &&

        ColumnUtil.Array.isColumnArray(raw.usedColumns) &&
        (typeof raw.alias == "string") &&
        ColumnMapUtil.isColumnMap(raw.columns) &&
        QueryTreeUtil.isQueryTree(raw.unaliasedQuery)
    );
}