import * as sd from "schema-decorator";
import {Expr, ExprUtil} from "../../expr";

let trueCache : Expr<{
    usedColumns: [];
    assertDelegate: sd.AssertDelegate<true>;
}>|undefined = undefined;
let falseCache : Expr<{
    usedColumns: [];
    assertDelegate: sd.AssertDelegate<false>;
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