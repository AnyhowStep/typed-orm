import * as sd from "schema-decorator";
import {RawExpr} from "../../../../../../../raw-expr";
import {RawExprUtil} from "../../../../../../../raw-expr";
import {Expr} from "../../../../../../../expr";
import {AfterWhenCase} from "./after-when-case";

export type Else<
    BuilderT extends AfterWhenCase,
    ElseT extends RawExpr<
        Exclude<ReturnType<BuilderT["result"]>, null>
    >
> = (
    Expr<{
        usedColumns : (
            BuilderT["usedColumns"][number] |
            RawExprUtil.UsedColumns<ElseT>[number]
        )[],
        assertDelegate : BuilderT["result"],
    }>
);
function ElseFunction<
    BuilderT extends AfterWhenCase,
    ElseT extends RawExpr<
        Exclude<ReturnType<BuilderT["result"]>, null>
    >
> (
    builder : BuilderT,
    elseExpr : ElseT
) : (
    Else<BuilderT, ElseT>
) {
    const elseAssertDelegate = RawExprUtil.assertDelegate(elseExpr);
    if (sd.isNullable(elseAssertDelegate)) {
        throw new Error(`Nullable expression not allowed, try calling .nullableElse()`);
    }
    return new Expr(
        {
            usedColumns : RawExprUtil.Array.usedColumns([
                ...builder.usedColumns,
                elseExpr,
            ]),
            assertDelegate : sd.or(
                builder.result,
                elseAssertDelegate
            ),
        },
        [
            ...builder.queryTree,
            "ELSE",
            RawExprUtil.queryTree(elseExpr),
            "END",
        ]
    ) as any;
}
export {ElseFunction as else};