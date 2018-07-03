import {RawExpr, AnyRawExpr, RawExprUtil} from "../raw-expr";
import {ColumnReferencesUtil} from "../column-references";
import {Expr} from "../expr";
import * as sd from "schema-decorator";

//https://dev.mysql.com/doc/refman/8.0/en/control-flow-functions.html#function_if
//Supposed to be `IF(condition, a, b)`
//but `if` is a reserved keyword.
export function ifTrue<
    ConditionT extends RawExpr<boolean>,
    TrueExprT extends AnyRawExpr,
    FalseExprT extends AnyRawExpr
> (
    condition : ConditionT,
    trueExpr : TrueExprT,
    falseExpr : FalseExprT
) : (
    Expr<
        ColumnReferencesUtil.Merge<
            RawExprUtil.UsedReferences<ConditionT>,
            ColumnReferencesUtil.Merge<
                RawExprUtil.UsedReferences<TrueExprT>,
                RawExprUtil.UsedReferences<FalseExprT>
            >
        >,
        RawExprUtil.Type<TrueExprT>|
        RawExprUtil.Type<FalseExprT>
    >
) {
    RawExprUtil.assertNonNullable(condition);

    return new Expr(
        ColumnReferencesUtil.merge(
            RawExprUtil.usedReferences(condition),
            ColumnReferencesUtil.merge(
                RawExprUtil.usedReferences(trueExpr),
                RawExprUtil.usedReferences(falseExpr)
            )
        ),
        sd.or(
            RawExprUtil.assertDelegate(trueExpr),
            RawExprUtil.assertDelegate(falseExpr)
        ),
        `IF(\n\t${RawExprUtil.querify(condition)},\n\t${RawExprUtil.querify(trueExpr)},\n\t${RawExprUtil.querify(falseExpr)}\n)`
    );
}