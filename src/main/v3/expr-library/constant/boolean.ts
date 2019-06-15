import * as sd from "type-mapping";
import {Expr, ExprUtil} from "../../expr";

let trueCache : Expr<{
    usedRef: {};
    assertDelegate: sd.SafeMapper<true>;
}>|undefined = undefined;
let falseCache : Expr<{
    usedRef: {};
    assertDelegate: sd.SafeMapper<false>;
}>|undefined = undefined;

function trueLiteral () {
    if (trueCache == undefined) {
        trueCache = ExprUtil.fromRawExpr(true as true);
    }
    return trueCache;
}
function getFalse () {
    if (falseCache == undefined) {
        falseCache = ExprUtil.fromRawExpr(false as false);
    }
    return falseCache;
}

export {
    trueLiteral as trueLiteral,
    getFalse as falseLiteral,
};