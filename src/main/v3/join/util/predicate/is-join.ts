import {IJoin, JoinTypeUtil} from "../../join";
import {AliasedTableUtil} from "../../../aliased-table";
import {ColumnMapUtil} from "../../../column-map";
import {ColumnUtil} from "../../../column";


export function isJoin (raw : any) : raw is IJoin {
    return (
        raw != undefined &&
        (raw instanceof Object) &&
        ("aliasedTable" in raw) &&
        ("columns" in raw) &&
        ("nullable" in raw) &&
        ("joinType" in raw) &&
        ("from" in raw) &&
        ("to" in raw) &&
        AliasedTableUtil.isAliasedTable(raw.aliasedTable) &&
        ColumnMapUtil.isColumnMap(raw.columns) &&
        (typeof raw.nullable == "boolean") &&
        JoinTypeUtil.isValue(raw.joinType) &&
        ColumnUtil.Array.isColumnArray(raw.from) &&
        ColumnUtil.Array.isColumnArray(raw.to)
    );
}