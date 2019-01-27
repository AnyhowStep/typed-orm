import * as sd from "schema-decorator";
import { Expr } from "../../../../expr";
import { RawExpr } from "../../../../raw-expr";
import { RawExprUtil } from "../../../../raw-expr";
export declare function like<RawExprT extends RawExpr<string>, PatternT extends RawExpr<string>>(rawExpr: RawExprT, pattern: PatternT): (Expr<{
    usedColumns: (RawExprUtil.UsedColumns<RawExprT>[number] | RawExprUtil.UsedColumns<PatternT>[number])[];
    assertDelegate: sd.AssertDelegate<boolean>;
}> & {
    escape: (escapeChar: string) => (Expr<{
        usedColumns: (RawExprUtil.UsedColumns<RawExprT>[number] | RawExprUtil.UsedColumns<PatternT>[number])[];
        assertDelegate: sd.AssertDelegate<boolean>;
    }>);
});
