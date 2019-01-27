import * as sd from "schema-decorator";
import { RawExpr } from "../../../../../../../raw-expr";
import { NonNullPrimitiveExpr, PrimitiveExprUtil } from "../../../../../../../primitive-expr";
import { RawExprUtil } from "../../../../../../../raw-expr";
import { ICaseValue, CaseValue } from "../../case-value";
export declare type When<BuilderT extends ICaseValue, WhenT extends RawExpr<ReturnType<BuilderT["value"]>>, ThenT extends RawExpr<BuilderT["result"] extends sd.AssertDelegate<any> ? ReturnType<BuilderT["result"]> : NonNullPrimitiveExpr>> = (CaseValue<{
    usedColumns: (BuilderT["usedColumns"][number] | RawExprUtil.UsedColumns<WhenT>[number] | RawExprUtil.UsedColumns<ThenT>[number])[];
    value: BuilderT["value"];
    result: (BuilderT["result"] extends sd.AssertDelegate<any> ? BuilderT["result"] : sd.AssertDelegate<PrimitiveExprUtil.ToSuperType<RawExprUtil.TypeOf<ThenT>>>);
}>);
export declare function when<BuilderT extends ICaseValue, WhenT extends RawExpr<ReturnType<BuilderT["value"]>>, ThenT extends RawExpr<BuilderT["result"] extends sd.AssertDelegate<any> ? ReturnType<BuilderT["result"]> : NonNullPrimitiveExpr>>(builder: BuilderT, whenExpr: WhenT, thenExpr: ThenT): (When<BuilderT, WhenT, ThenT>);
