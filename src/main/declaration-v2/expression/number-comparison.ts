import {booleanExpr} from "./boolean-expr";
import {RawExpr, RawExprUtil} from "../raw-expr";
import {ColumnReferencesUtil} from "../column-references";
import {Expr} from "../expr";

function numberComparison (operator : string) {
    function result<
        LeftT extends RawExpr<number>,
        RightT extends RawExpr<number>
    > (left : LeftT, right : RightT) : (
        Expr<
            ColumnReferencesUtil.Merge<
                RawExprUtil.UsedReferences<LeftT>,
                RawExprUtil.UsedReferences<RightT>
            >,
            boolean
        >
    ) {
        RawExprUtil.assertNonNullable(left);
        RawExprUtil.assertNonNullable(right);
        
        return booleanExpr(
            ColumnReferencesUtil.merge(
                RawExprUtil.usedReferences(left),
                RawExprUtil.usedReferences(right)
            ),
            //TODO More readable queries
            `${RawExprUtil.querify(left)} ${operator} ${RawExprUtil.querify(right)}`
        );
    }
    Object.defineProperty(result, "name", {
        value : operator,
    });
    return result;
}

export const lt = numberComparison("<");
export const gt = numberComparison(">");
export const ltEq = numberComparison("<=");
export const gtEq = numberComparison(">=");
