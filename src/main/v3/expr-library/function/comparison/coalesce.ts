import * as sd from "type-mapping";
import {Expr, ExprData} from "../../../expr";
import {RawExpr} from "../../../raw-expr";
import {RawExprUtil} from "../../../raw-expr";
import {FunctionCall} from "../../../query-tree";
import {PrimitiveExpr} from "../../../primitive-expr";
import {Tuple} from "../../../tuple";

/*
    https://dev.mysql.com/doc/refman/8.0/en/comparison-operators.html#function_coalesce

    In general, the return type should be,

    null extends TypeOf<Arg0> ?
    (
        null extends TypeOf<Arg1> ?
        (
            null extends TypeOf<Arg2> ?
            (/ * etc, etc, etc. * /) :
            Exclude<TypeOf<Arg0>|TypeOf<Arg1>, null>|TypeOf<Arg2>
        ) :
        Exclude<TypeOf<Arg0>, null>|TypeOf<Arg1>
    ) :
    TypeOf<Arg0>

    but it's just too complicated.
*/
export function coalesce<
    Arg0 extends RawExpr<PrimitiveExpr>,
    Arg1 extends RawExpr<RawExprUtil.TypeOf<Arg0>>
>(
    arg0 : Arg0,
    arg1 : Arg1
) : (
    Expr<{
        usedRef : RawExprUtil.IntersectUsedRefTuple<
            [Arg0, Arg1]
        >,
        assertDelegate : RawExprUtil.AssertDelegate<
            Exclude<RawExprUtil.TypeOf<Arg0>, null>|
            Arg1
        >,
    }>
);
export function coalesce<
    Arg0 extends RawExpr<PrimitiveExpr>,
    Arg1 extends RawExpr<RawExprUtil.TypeOf<Arg0>>,
    Arg2 extends RawExpr<RawExprUtil.TypeOf<Arg0>>
>(
    arg0 : Arg0,
    arg1 : Arg1,
    arg2 : Arg2
) : (
    Expr<{
        usedRef : RawExprUtil.IntersectUsedRefTuple<
            [Arg0, Arg1, Arg2]
        >,
        assertDelegate : RawExprUtil.AssertDelegate<
            Exclude<RawExprUtil.TypeOf<Arg0>, null>|
            Exclude<RawExprUtil.TypeOf<Arg1>, null>|
            Arg2
        >,
    }>
);
export function coalesce<
    Arg0 extends RawExpr<PrimitiveExpr>,
    Arg1 extends RawExpr<RawExprUtil.TypeOf<Arg0>>,
    Arg2 extends RawExpr<RawExprUtil.TypeOf<Arg0>>,
    Arg3 extends RawExpr<RawExprUtil.TypeOf<Arg0>>
>(
    arg0 : Arg0,
    arg1 : Arg1,
    arg2 : Arg2,
    arg3 : Arg3
) : (
    Expr<{
        usedRef : RawExprUtil.IntersectUsedRefTuple<
            [Arg0, Arg1, Arg2, Arg3]
        >,
        assertDelegate : RawExprUtil.AssertDelegate<
            Exclude<RawExprUtil.TypeOf<Arg0>, null>|
            Exclude<RawExprUtil.TypeOf<Arg1>, null>|
            Exclude<RawExprUtil.TypeOf<Arg2>, null>|
            Arg3
        >,
    }>
);
export function coalesce(
    ...args : Tuple<RawExpr<PrimitiveExpr>>
) : (
    Expr<ExprData>
) {
    return new Expr(
        {
            usedRef : RawExprUtil.intersectUsedRefTuple(...(args as any)),
            assertDelegate : sd.unsafeOr(...args.map((arg, index) => {
                if (index == args.length-1) {
                    return RawExprUtil.assertDelegate(arg);
                } else {
                    return sd.notNull(RawExprUtil.assertDelegate(arg));
                }
            })),
        },
        new FunctionCall("COALESCE", args.map(RawExprUtil.queryTree))
    );
}