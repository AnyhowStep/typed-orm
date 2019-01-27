import * as sd from "schema-decorator";
import { RawExpr } from "../../../../../../../raw-expr";
import { NonNullPrimitiveExpr, PrimitiveExprUtil } from "../../../../../../../primitive-expr";
import { RawExprUtil } from "../../../../../../../raw-expr";
import { ICaseCondition, CaseCondition } from "../../case-condition";
export declare type When<BuilderT extends ICaseCondition, WhenT extends RawExpr<boolean>, ThenT extends RawExpr<BuilderT["result"] extends sd.AssertDelegate<any> ? ReturnType<BuilderT["result"]> : NonNullPrimitiveExpr>> = (CaseCondition<{
    usedColumns: (BuilderT["usedColumns"][number] | RawExprUtil.UsedColumns<WhenT>[number] | RawExprUtil.UsedColumns<ThenT>[number])[];
    result: (BuilderT["result"] extends sd.AssertDelegate<any> ? BuilderT["result"] : sd.AssertDelegate<PrimitiveExprUtil.ToSuperType<RawExprUtil.TypeOf<ThenT>>>);
}>);
export declare function when<BuilderT extends ICaseCondition, WhenT extends RawExpr<boolean>, ThenT extends RawExpr<BuilderT["result"] extends sd.AssertDelegate<any> ? ReturnType<BuilderT["result"]> : NonNullPrimitiveExpr>>(builder: BuilderT, whenExpr: WhenT, thenExpr: ThenT): (When<BuilderT, WhenT, ThenT>);
