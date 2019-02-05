import * as sd from "schema-decorator";
import {Expr} from "../../../expr";
import {RawExpr} from "../../../raw-expr";
import {RawExprUtil} from "../../../raw-expr";
import {NonNullPrimitiveExpr, PrimitiveExprUtil} from "../../../primitive-expr";
import {Tuple} from "../../../tuple";
import {FunctionCall} from "../../../query-tree";
import {OneSelectItemQuery}  from "../../../query/util";
import * as dataType from "../../../data-type";
import { QueryUtil } from "../../../query";
import { ColumnRefUtil } from "../../../column-ref";

//https://dev.mysql.com/doc/refman/8.0/en/comparison-operators.html#function_in
function inSubQuery<
    LeftT extends RawExpr<NonNullPrimitiveExpr>,
    RightT extends OneSelectItemQuery<
        PrimitiveExprUtil.ToSuperType<
            RawExprUtil.TypeOf<LeftT>
        >
    >
> (
    left : LeftT,
    right : RightT
) : (
    Expr<{
        usedRef : (
            RawExprUtil.UsedRef<LeftT> &
            ColumnRefUtil.FromQueryJoins<RightT>
        ),
        assertDelegate : sd.AssertDelegate<boolean>,
    }>
) {
    return new Expr(
        {
            usedRef : ColumnRefUtil.intersectTuple(
                RawExprUtil.usedRef(left),
                ColumnRefUtil.fromQueryJoins(right)
            ),
            assertDelegate : dataType.boolean(),
        },
        [
            RawExprUtil.queryTree(left),
            new FunctionCall(
                "IN",
                [
                    QueryUtil.queryTree_RawExpr(right)
                ]
            ),
        ]
    ) as any;
}

//https://dev.mysql.com/doc/refman/8.0/en/comparison-operators.html#function_in
function inList<
    LeftT extends RawExpr<NonNullPrimitiveExpr>,
    Arg0 extends RawExpr<RawExprUtil.TypeOf<LeftT>>,
    Args extends Tuple<RawExpr<RawExprUtil.TypeOf<LeftT>>>
>(
    left : LeftT,
    arg0 : Arg0,
    ...args : Args
) : (
    //Not an exact typing but, in general, should work
    Expr<{
        usedRef : (
            RawExprUtil.UsedRef<LeftT> &
            RawExprUtil.UsedRef<Arg0> &
            RawExprUtil.IntersectUsedRefTuple<Args>
        ),
        assertDelegate : sd.AssertDelegate<boolean>,
    }>
) {
    return new Expr(
        {
            usedRef : RawExprUtil.intersectUsedRefTuple(left, arg0, ...(args as any)),
            assertDelegate : dataType.boolean(),
        },
        [
            RawExprUtil.queryTree(left),
            new FunctionCall(
                "IN",
                [
                    RawExprUtil.queryTree(arg0),
                    ...args.map(RawExprUtil.queryTree),
                ]
            ),
        ]
    ) as any;
}

function In<
    LeftT extends RawExpr<NonNullPrimitiveExpr>,
    Arg0 extends RawExpr<RawExprUtil.TypeOf<LeftT>>,
    Args extends Tuple<RawExpr<RawExprUtil.TypeOf<LeftT>>>
>(
    left : LeftT,
    arg0 : Arg0,
    ...args : Args
) : (
    //Not an exact typing but, in general, should work
    Expr<{
        usedRef : (
            RawExprUtil.UsedRef<LeftT> &
            RawExprUtil.UsedRef<Arg0> &
            RawExprUtil.IntersectUsedRefTuple<Args>
        ),
        assertDelegate : sd.AssertDelegate<boolean>,
    }>
);
function In<
    LeftT extends RawExpr<NonNullPrimitiveExpr>,
    RightT extends OneSelectItemQuery<
        PrimitiveExprUtil.ToSuperType<
            RawExprUtil.TypeOf<LeftT>
        >
    >
> (
    left : LeftT,
    right : RightT
) : (
    Expr<{
        usedRef : (
            RawExprUtil.UsedRef<LeftT> &
            ColumnRefUtil.FromQueryJoins<RightT>
        ),
        assertDelegate : sd.AssertDelegate<boolean>,
    }>
);
function In (left : any, arg0 : any, ...args : any[]) {
    if (
        args.length == 0 &&
        QueryUtil.isQuery(arg0) &&
        QueryUtil.isOneSelectItemQuery(arg0)
    ) {
        return inSubQuery(left, arg0);
    } else {
        return inList(left, arg0, ...(args as any));
    }
}
export {In as in};