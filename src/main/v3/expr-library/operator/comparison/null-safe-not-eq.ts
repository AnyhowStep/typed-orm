import * as sd from "type-mapping";
import {Expr} from "../../../expr";
import {RawExpr} from "../../../raw-expr";
import {PrimitiveExpr} from "../../../primitive-expr";
import {RawExprUtil} from "../../../raw-expr";
import {ColumnRefUtil} from "../../../column-ref";
import {not} from "../logical";
import {nullSafeEq} from "./null-safe-eq";


/*
    Internally,

    NOT (a <=> b)
*/
export function nullSafeNotEq<
    LeftT extends RawExpr<PrimitiveExpr>,
    RightT extends RawExpr<RawExprUtil.TypeOf<LeftT>|null>
>(
    left : LeftT,
    right : RightT
) : (
    Expr<{
        usedRef : ColumnRefUtil.Intersect<
            RawExprUtil.UsedRef<LeftT>,
            RawExprUtil.UsedRef<RightT>
        >,
        assertDelegate : sd.SafeMapper<boolean>,
    }>
) {
    //Strange that I cannot compose them in a generic context
    return not(nullSafeEq(left, right)) as any;
}