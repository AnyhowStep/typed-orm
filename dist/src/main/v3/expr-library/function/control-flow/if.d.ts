import * as sd from "type-mapping";
import { Expr } from "../../../expr";
import { RawExpr } from "../../../raw-expr";
import { RawExprUtil } from "../../../raw-expr";
import { PrimitiveExpr } from "../../../primitive-expr";
declare function If<ConditionT extends RawExpr<boolean>, ThenT extends RawExpr<PrimitiveExpr>, ElseT extends RawExpr<PrimitiveExpr>>(condition: ConditionT, thenExpr: ThenT, elseExpr: ElseT): (Expr<{
    usedRef: (RawExprUtil.UsedRef<ConditionT> & RawExprUtil.UsedRef<ThenT> & RawExprUtil.UsedRef<ElseT>);
    assertDelegate: sd.SafeMapper<RawExprUtil.TypeOf<ThenT> | RawExprUtil.TypeOf<ElseT>>;
}>);
export { If as if };
