/// <reference types="node" />
import * as sd from "schema-decorator";
import { Expr } from "../../../expr";
import { RawExpr } from "../../../raw-expr";
import { RawExprUtil } from "../../../raw-expr";
import { TranscodingName } from "../../constant";
export declare function toChar<Arg0 extends RawExpr<number>, Args extends RawExpr<number>[]>(arg0: Arg0, ...args: Args): (Expr<{
    usedColumns: (RawExprUtil.UsedColumns<Arg0>[number] | RawExprUtil.Array.UsedColumns<Args>[number])[];
    assertDelegate: sd.AssertDelegate<Buffer>;
}> & {
    using: (transcodingName: TranscodingName) => (Expr<{
        usedColumns: (RawExprUtil.UsedColumns<Arg0>[number] | RawExprUtil.Array.UsedColumns<Args>[number])[];
        assertDelegate: sd.AssertDelegate<string>;
    }>);
});
