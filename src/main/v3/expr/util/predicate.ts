import {IExpr} from "../expr";
import {QueryTreeUtil} from "../../query-tree";

export function isExpr (raw : any) : raw is IExpr {
    return (
        (raw != undefined) &&
        (raw instanceof Object) &&
        ("usedRef" in raw) &&
        ("assertDelegate" in raw) &&
        ("queryTree" in raw) &&
        (raw.usedRef instanceof Object) &&
        (typeof raw.assertDelegate == "function") &&
        (QueryTreeUtil.isQueryTree(raw.queryTree))
    );
}