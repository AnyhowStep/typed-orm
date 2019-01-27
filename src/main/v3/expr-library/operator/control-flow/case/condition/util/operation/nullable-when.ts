import * as sd from "schema-decorator";
import {RawExpr} from "../../../../../../../raw-expr";
import {PrimitiveExpr, PrimitiveExprUtil} from "../../../../../../../primitive-expr";
import {RawExprUtil} from "../../../../../../../raw-expr";
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
        usedColumns : (
            BuilderT["usedColumns"][number] |
            RawExprUtil.UsedColumns<WhenT>[number] |
            RawExprUtil.UsedColumns<ThenT>[number]
        )[],
        result : (
            BuilderT["result"] extends sd.AssertDelegate<any> ?
            sd.AssertDelegate<
                ReturnType<BuilderT["result"]> |
                RawExprUtil.TypeOf<ThenT>
            > :
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
            usedColumns : RawExprUtil.Array.usedColumns([
                ...builder.usedColumns,
                whenExpr,
                thenExpr,
            ]),
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