import * as sd from "schema-decorator";
import { RawExpr } from "../../../../../../../raw-expr";
import { PrimitiveExpr, PrimitiveExprUtil } from "../../../../../../../primitive-expr";
import { RawExprUtil } from "../../../../../../../raw-expr";
import { ICaseCondition, CaseCondition } from "../../case-condition";
export declare type NullableWhen<BuilderT extends ICaseCondition, WhenT extends RawExpr<boolean>, ThenT extends RawExpr<BuilderT["result"] extends sd.AssertDelegate<any> ? ReturnType<BuilderT["result"]> | null : PrimitiveExpr>> = (CaseCondition<{
    usedColumns: (BuilderT["usedColumns"][number] | RawExprUtil.UsedColumns<WhenT>[number] | RawExprUtil.UsedColumns<ThenT>[number])[];
    result: (BuilderT["result"] extends sd.AssertDelegate<any> ? sd.AssertDelegate<ReturnType<BuilderT["result"]> | RawExprUtil.TypeOf<ThenT>> : sd.AssertDelegate<PrimitiveExprUtil.ToSuperType<RawExprUtil.TypeOf<ThenT>>>);
}>);
export declare function nullableWhen<BuilderT extends ICaseCondition, WhenT extends RawExpr<boolean>, ThenT extends RawExpr<BuilderT["result"] extends sd.AssertDelegate<any> ? ReturnType<BuilderT["result"]> | null : PrimitiveExpr>>(builder: BuilderT, whenExpr: WhenT, thenExpr: ThenT): (NullableWhen<BuilderT, WhenT, ThenT>);
