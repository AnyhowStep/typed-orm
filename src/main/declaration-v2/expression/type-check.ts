import {AnyRawExpr, RawExprUtil} from "../raw-expr";
import {booleanExpr} from "./boolean-expr";
import {Expr} from "../expr";
import * as invalid from "../invalid";
import {ColumnReferencesUtil} from "../column-references";
import * as variadicUtil from "./variadic-util";

export function isNull<
    RawT extends AnyRawExpr
> (expr : RawT) : Expr<RawExprUtil.UsedReferences<RawT>, boolean> {
    return booleanExpr(
        RawExprUtil.usedReferences(expr),
        `${RawExprUtil.querify(expr)} IS NULL`
    );
}

export function isNotNull<
    RawT extends AnyRawExpr
> (expr : RawT) : Expr<RawExprUtil.UsedReferences<RawT>, boolean> {
    return booleanExpr(
        RawExprUtil.usedReferences(expr),
        `${RawExprUtil.querify(expr)} IS NOT NULL`
    );
}

export function typeCheckBinaryOp (operator : string) {
    function result<
        LeftT extends AnyRawExpr,
        RightT extends AnyRawExpr
    > (left : LeftT, right : RightT) : (
        null extends RawExprUtil.Type<LeftT> ?
            invalid.E3<
                "Left expression is nullable,",
                RawExprUtil.Type<LeftT>,
                "comparison with NULL yields NULL; consider narrowing"
            > :
            null extends RawExprUtil.Type<RightT> ?
                invalid.E3<
                    "Right expression is nullable,",
                    RawExprUtil.Type<RightT>,
                    "comparison with NULL yields NULL; consider narrowing"
                > :
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
            `${RawExprUtil.querify(left)} ${operator} ${RawExprUtil.querify(right)}`
        ) as any;
    }
    Object.defineProperty(result, "name", {
        value : operator,
    });
    return result;
}

export const eq = typeCheckBinaryOp("=");
export const notEq = typeCheckBinaryOp("!=");

//`in` is a reserved keyword
export function isIn<
    LeftT extends AnyRawExpr,
    RightT extends AnyRawExpr
> (left : LeftT, ...rightArr : RightT[]) : (
    null extends RawExprUtil.Type<LeftT> ?
        invalid.E3<
            "Left expression is nullable,",
            RawExprUtil.Type<LeftT>,
            "comparison with NULL yields NULL; consider narrowing"
        > :
        null extends RawExprUtil.Type<RightT> ?
            invalid.E3<
                "Left expression is nullable,",
                RawExprUtil.Type<LeftT>,
                "comparison with NULL yields NULL; consider narrowing"
            > :
            Expr<
                ColumnReferencesUtil.Merge<
                    RawExprUtil.UsedReferences<LeftT>,
                    RawExprUtil.UsedReferences<RightT>
                >,
                boolean
            >
) {
    const q = variadicUtil.querifyNonNullable(left, ...rightArr);

    return booleanExpr(
        q.used,
        `${q.leftQuery} IN(${q.rightQueries.join(",")})`
    ) as any;
}
