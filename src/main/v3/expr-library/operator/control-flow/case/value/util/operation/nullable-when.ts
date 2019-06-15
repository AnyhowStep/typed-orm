import * as sd from "type-mapping";
import {RawExpr} from "../../../../../../../raw-expr";
import {PrimitiveExpr, PrimitiveExprUtil} from "../../../../../../../primitive-expr";
import {RawExprUtil} from "../../../../../../../raw-expr";
import {ColumnRefUtil} from "../../../../../../../column-ref";
import {ICaseValue, CaseValue} from "../../case-value";

export type NullableWhen<
    BuilderT extends ICaseValue,
    WhenT extends RawExpr<ReturnType<BuilderT["value"]>>,
    ThenT extends RawExpr<
        BuilderT["result"] extends sd.SafeMapper<any> ?
        ReturnType<BuilderT["result"]>|null :
        PrimitiveExpr
    >
> = (
    CaseValue<{
        usedRef : (
            BuilderT["usedRef"] &
            RawExprUtil.UsedRef<WhenT> &
            RawExprUtil.UsedRef<ThenT>
        ),
        value : BuilderT["value"],
        result : (
            BuilderT["result"] extends sd.SafeMapper<any> ?
            sd.SafeMapper<
                ReturnType<BuilderT["result"]> |
                RawExprUtil.TypeOf<ThenT>
            > :
            sd.SafeMapper<
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
export function nullableWhen<
    BuilderT extends ICaseValue,
    WhenT extends RawExpr<ReturnType<BuilderT["value"]>>,
    ThenT extends RawExpr<
        BuilderT["result"] extends sd.SafeMapper<any> ?
        ReturnType<BuilderT["result"]>|null :
        PrimitiveExpr
    >
>(builder : BuilderT, whenExpr : WhenT, thenExpr : ThenT) : (
    NullableWhen<BuilderT, WhenT, ThenT>
) {
    return new CaseValue(
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