import { RawExpr } from "../../../../../../../raw-expr";
import { RawExprUtil } from "../../../../../../../raw-expr";
import { Expr } from "../../../../../../../expr";
import { AfterWhenCase } from "./after-when-case";
export declare type Else<BuilderT extends AfterWhenCase, ElseT extends RawExpr<Exclude<ReturnType<BuilderT["result"]>, null>>> = (Expr<{
    usedColumns: (BuilderT["usedColumns"][number] | RawExprUtil.UsedColumns<ElseT>[number])[];
    assertDelegate: BuilderT["result"];
}>);
declare function ElseFunction<BuilderT extends AfterWhenCase, ElseT extends RawExpr<Exclude<ReturnType<BuilderT["result"]>, null>>>(builder: BuilderT, elseExpr: ElseT): (Else<BuilderT, ElseT>);
export { ElseFunction as else };
