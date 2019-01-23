import * as sd from "schema-decorator";
import {RawExpr} from "../../../../../../../raw-expr";
import {NonNullPrimitiveExpr, PrimitiveExprUtil} from "../../../../../../../primitive-expr";
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
            sd.AssertDelegate<
                /*
                    We use ToSuperType<> so that the following works,

                    case()
                        .when(condition, 0n)
                        .when(condition, bigint)

                    Without ToSuperType<>,

                    case()
                        .when(condition, 0n)
                        //Error, bigint not assignable to 0n
                        .when(condition, bigint)
                */
                PrimitiveExprUtil.ToSuperType<
                    RawExprUtil.TypeOf<ThenT>
                >
            >
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