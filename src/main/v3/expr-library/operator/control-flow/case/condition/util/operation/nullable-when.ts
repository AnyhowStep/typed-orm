import * as sd from "schema-decorator";
import {RawExpr} from "../../../../../../../raw-expr";
import {PrimitiveExpr} from "../../../../../../../primitive-expr";
import {RawExprUtil} from "../../../../../../../raw-expr";
import {ColumnRefUtil} from "../../../../../../../column-ref";
import {ICaseCondition, CaseCondition} from "../../case-condition";

export type NullableWhen<
    BuilderT extends ICaseCondition,
    WhenT extends RawExpr<boolean>,
    ThenT extends RawExpr<
        BuilderT["result"] extends sd.AssertDelegate<any> ?
        ReturnType<BuilderT["result"]>|null :
        PrimitiveExpr
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
            sd.AssertDelegate<
                ReturnType<BuilderT["result"]> |
                RawExprUtil.TypeOf<ThenT>
            > :
            sd.AssertDelegate<RawExprUtil.TypeOf<ThenT>>
        ),
    }>
);
export function nullableWhen<
    BuilderT extends ICaseCondition,
    WhenT extends RawExpr<boolean>,
    ThenT extends RawExpr<
        BuilderT["result"] extends sd.AssertDelegate<any> ?
        ReturnType<BuilderT["result"]>|null :
        PrimitiveExpr
    >
>(builder : BuilderT, whenExpr : WhenT, thenExpr : ThenT) : (
    NullableWhen<BuilderT, WhenT, ThenT>
) {
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
                    RawExprUtil.assertDelegate(thenExpr) :
                    sd.or(
                        builder.result,
                        RawExprUtil.assertDelegate(thenExpr)
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