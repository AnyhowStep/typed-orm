import {Expr, AnyExpr} from "./expr";

export namespace ExprUtil {
    //Compile time hiding only
    export function dangerouslyHideUsedReferences<
        ExprT extends AnyExpr
    > (expr : ExprT) : Expr<{}, ReturnType<ExprT["assertDelegate"]>> {
        return expr as any;
    }
}