import {AnyRawExpr, RawExprUtil} from "../raw-expr";
import {nullableBooleanExpr} from "./boolean-expr";
import {Expr} from "../expr";
import * as variadicUtil from "./variadic-util";
import {ColumnReferencesUtil} from "../column-references";

import {SelectBuilder} from "../select-builder";
import {Column} from "../column";
SelectBuilder;
Column;


export function unsafeTypeCheckBinaryOp (operator : string) {
    function result<
        LeftT extends AnyRawExpr,
        RightT extends AnyRawExpr
    > (left : LeftT, right : RightT) : (
        Expr<
            ColumnReferencesUtil.Merge<
                RawExprUtil.UsedReferences<LeftT>,
                RawExprUtil.UsedReferences<RightT>
            >,
            boolean|null
        >
    ) {
        return nullableBooleanExpr(
            ColumnReferencesUtil.merge(
                RawExprUtil.usedReferences(left),
                RawExprUtil.usedReferences(right)
            ),
            `${RawExprUtil.querify(left)} ${operator} ${RawExprUtil.querify(right)}`
        ) as any;
    }
    Object.defineProperty(result, "name", {
        value : operator,
    });
    return result;
}

export const unsafeEq = unsafeTypeCheckBinaryOp("=");
export const unsafeNotEq = unsafeTypeCheckBinaryOp("!=");

export function unsafeIsIn<
    LeftT extends AnyRawExpr,
    RightT extends AnyRawExpr
> (left : LeftT, ...rightArr : RightT[]) : (
    Expr<
        ColumnReferencesUtil.Merge<
            RawExprUtil.UsedReferences<LeftT>,
            RawExprUtil.UsedReferences<RightT>
        >,
        boolean|null
    >
) {
    const q = variadicUtil.querifyNullable(left, ...rightArr);
    
    return nullableBooleanExpr(
        q.used,
        `${q.leftQuery} IN(${q.rightQueries.join(",")})`
    ) as any;
}