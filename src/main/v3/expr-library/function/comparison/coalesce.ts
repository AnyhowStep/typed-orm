import * as sd from "schema-decorator";
import {Expr, ExprData} from "../../../expr";
import {RawExpr} from "../../../raw-expr";
import {RawExprUtil} from "../../../raw-expr";
import {FunctionCall} from "../../../query-tree";
import {PrimitiveExpr} from "../../../primitive-expr";

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
        usedColumns : (
            RawExprUtil.UsedColumns<Arg0>[number] |
            RawExprUtil.UsedColumns<Arg1>[number]
        )[],
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
        usedColumns : (
            RawExprUtil.UsedColumns<Arg0>[number] |
            RawExprUtil.UsedColumns<Arg1>[number] |
            RawExprUtil.UsedColumns<Arg2>[number]
        )[],
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
        usedColumns : (
            RawExprUtil.UsedColumns<Arg0>[number] |
            RawExprUtil.UsedColumns<Arg1>[number] |
            RawExprUtil.UsedColumns<Arg2>[number] |
            RawExprUtil.UsedColumns<Arg3>[number]
        )[],
        assertDelegate : RawExprUtil.AssertDelegate<
            Exclude<RawExprUtil.TypeOf<Arg0>, null>|
            Exclude<RawExprUtil.TypeOf<Arg1>, null>|
            Exclude<RawExprUtil.TypeOf<Arg2>, null>|
            Arg3
        >,
    }>
);
export function coalesce(
    ...args : RawExpr<PrimitiveExpr>[]
) : (
    Expr<ExprData>
) {
    return new Expr(
        {
            usedColumns : RawExprUtil.Array.usedColumns(args),
            assertDelegate : sd.or(...args.map((arg, index) => {
                if (index == args.length-1) {
                    return RawExprUtil.assertDelegate(arg);
                } else {
                    return sd.notNullable(RawExprUtil.assertDelegate(arg));
                }
            })),
        },
        new FunctionCall("COALESCE", args.map(RawExprUtil.queryTree))
    );
}