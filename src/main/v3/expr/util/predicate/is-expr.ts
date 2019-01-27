import {IExpr} from "../../expr";
import {ColumnUtil} from "../../../column";
import {QueryTreeUtil} from "../../../query-tree";

export function isExpr (raw : any) : raw is IExpr {
    return (
        (raw != undefined) &&
        (raw instanceof Object) &&
        ("usedColumns" in raw) &&
        ("assertDelegate" in raw) &&
        ("queryTree" in raw) &&
        (ColumnUtil.Array.isColumnArray(raw.usedColumns)) &&
        (typeof raw.assertDelegate == "function") &&
        (QueryTreeUtil.isQueryTree(raw.queryTree))
    );
}