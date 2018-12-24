import * as sd from "schema-decorator";
import {Expr, ExprUtil} from "../../expr";

let trueCache : Expr<{
    usedRef: {};
    assertDelegate: sd.AssertDelegate<true>;
}>|undefined = undefined;
let falseCache : Expr<{
    usedRef: {};
    assertDelegate: sd.AssertDelegate<false>;
}>|undefined = undefined;

function getTrue () {
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
    getTrue as true,
    getFalse as false,
};