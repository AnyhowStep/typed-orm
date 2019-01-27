import * as sd from "schema-decorator";
import { Expr } from "../../../expr";
import { RawExpr } from "../../../raw-expr";
import { RawExprUtil } from "../../../raw-expr";
import { Tuple } from "../../../tuple";
export declare function concat<Arg0 extends RawExpr<string>, Args extends Tuple<RawExpr<string>>>(arg0: Arg0, ...args: Args): (Expr<{
    usedColumns: (RawExprUtil.UsedColumns<Arg0>[number] | RawExprUtil.Array.UsedColumns<Args>[number])[];
    assertDelegate: sd.AssertDelegate<string>;
}>);
