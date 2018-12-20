import * as sd from "schema-decorator";
import {RawExpr} from "../../../../../../../raw-expr";
import {NonNullPrimitiveExpr} from "../../../../../../../primitive-expr";
import {RawExprUtil} from "../../../../../../../raw-expr";
import {ColumnRefUtil} from "../../../../../../../column-ref";
import {ICaseCondition, CaseCondition} from "../../case-condition";

export type When<
    BuilderT extends ICaseCondition,
    WhenT extends RawExpr<boolean>,
    ThenT extends RawExpr<
        BuilderT["result"] extends sd.AssertDelegate<any> ?
        ReturnType<BuilderT["result"]> :
        NonNullPrimitiveExpr
    >
> = (
    CaseCondition<{
        usedRef : (
            BuilderT["usedRef"] &
            RawExprUtil.UsedRef<WhenT> &
            RawExprUtil.UsedRef<ThenT>
        ),
        result : (
            BuilderT["result"] extends sd.AssertDelegate<any> ?
            BuilderT["result"] :
            sd.AssertDelegate<RawExprUtil.TypeOf<ThenT>>
        ),
    }>
);
export function when<
    BuilderT extends ICaseCondition,
    WhenT extends RawExpr<boolean>,
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
    return new CaseCondition(
        {
            usedRef : ColumnRefUtil.intersect(
                builder.usedRef,
                ColumnRefUtil.intersect(
                    RawExprUtil.usedRef(whenExpr),
                    RawExprUtil.usedRef(thenExpr)
                )
            ),
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