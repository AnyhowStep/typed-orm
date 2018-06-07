import {booleanExpr} from "./boolean-expr";
import {RawExpr, RawExprUtil} from "../raw-expr";
import {ColumnReferencesUtil} from "../column-references";
import {Expr} from "../expr";

import {SelectBuilder} from "../select-builder";
import {Column} from "../column";
import {AliasedExpr} from "../aliased-expr";
SelectBuilder;
Column;
AliasedExpr;

function dateTimeComparison (operator : string) {
    function result<
        LeftT extends RawExpr<Date>,
        RightT extends RawExpr<Date>
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

export const isBefore = dateTimeComparison("<");
export const isAfter = dateTimeComparison(">");
export const isBeforeOrEqual = dateTimeComparison("<=");
export const isAfterOrEqual = dateTimeComparison(">=");
