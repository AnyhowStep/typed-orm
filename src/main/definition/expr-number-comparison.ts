import * as d from "../declaration";
import {Expr} from "./expr";
import {usedColumns, querify} from "./expr-operation";
import {spread} from "@anyhowstep/type-util";
import {booleanExpr} from "./expr-factory";

function numberComparison (operator : string) {
    function result<
        LeftT extends d.RawExpr<number>,
        RightT extends d.RawExpr<number>
    > (left : LeftT, right : RightT) : Expr<
        d.ExprUsedColumns<LeftT> & d.ExprUsedColumns<RightT>,
        boolean
    > {
        return booleanExpr(
            spread(
                usedColumns(left),
                usedColumns(right)
            ),
            `${querify(left)} ${operator} ${querify(right)}`
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
