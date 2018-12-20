import * as sd from "schema-decorator";
import {RawExpr} from "../../../../../../raw-expr";
import {NonNullPrimitiveExpr} from "../../../../../../primitive-expr";
import {RawExprUtil} from "../../../../../../raw-expr";
import {ColumnRefUtil} from "../../../../../../column-ref";
import {ICase, Case} from "../../case";

export type When<
    BuilderT extends ICase,
    WhenT extends RawExpr<ReturnType<BuilderT["value"]>>,
    ThenT extends RawExpr<
        BuilderT["result"] extends sd.AssertDelegate<any> ?
        ReturnType<BuilderT["result"]> :
        NonNullPrimitiveExpr
    >
> = (
    Case<{
        usedRef : (
            BuilderT["usedRef"] &
            RawExprUtil.UsedRef<WhenT> &
            RawExprUtil.UsedRef<ThenT>
        ),
        value : BuilderT["value"],
        result : (
            BuilderT["result"] extends sd.AssertDelegate<any> ?
            BuilderT["result"] :
            sd.AssertDelegate<RawExprUtil.TypeOf<ThenT>>
        ),
    }>
);
export function when<
    BuilderT extends ICase,
    WhenT extends RawExpr<ReturnType<BuilderT["value"]>>,
    ThenT extends RawExpr<
        BuilderT["result"] extends sd.AssertDelegate<any> ?
        ReturnType<BuilderT["result"]> :
        NonNullPrimitiveExpr
    >
>(builder : BuilderT, whenExpr : WhenT, thenExpr : ThenT) : (
    When<BuilderT, WhenT, ThenT>
) {
    const thenAssertDelegate = RawExprUtil.assertDelegate(thenExpr);
    if (sd.isNullable(thenAssertDelegate)) {
        throw new Error(`Nullable expression not allowed, try calling .nullableWhen()`);
    }
    return new Case(
        {
            usedRef : ColumnRefUtil.intersect(
                builder.usedRef,
                ColumnRefUtil.intersect(
                    RawExprUtil.usedRef(whenExpr),
                    RawExprUtil.usedRef(thenExpr)
                )
            ),
            value : builder.value,
            result : (
                builder.result == undefined ?
                    thenAssertDelegate :
                    sd.or(
                        builder.result,
                        thenAssertDelegate
                    )
            ),
        },
        [
            ...builder.queryTree,
            "WHEN",
            RawExprUtil.queryTree(whenExpr),
            "THEN",
            RawExprUtil.queryTree(thenExpr),
        ]
    ) as any;
}