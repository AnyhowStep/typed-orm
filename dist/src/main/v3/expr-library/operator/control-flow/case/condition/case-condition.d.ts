import * as sd from "schema-decorator";
import { RawExpr } from "../../../../../raw-expr";
import { PrimitiveExpr, NonNullPrimitiveExpr } from "../../../../../primitive-expr";
import { ColumnRef } from "../../../../../column-ref";
import { QueryTreeArray } from "../../../../../query-tree";
import * as CaseConditionUtil from "./util";
export interface CaseConditionData {
    readonly usedRef: ColumnRef;
    readonly result: sd.AssertDelegate<any> | undefined;
}
export interface ICaseCondition<DataT extends CaseConditionData = CaseConditionData> {
    readonly usedRef: DataT["usedRef"];
    readonly result: DataT["result"];
    readonly queryTree: QueryTreeArray;
}
export declare class CaseCondition<DataT extends CaseConditionData> implements ICaseCondition<DataT> {
    readonly usedRef: DataT["usedRef"];
    readonly result: DataT["result"];
    readonly queryTree: QueryTreeArray;
    constructor(data: DataT, queryTree: QueryTreeArray);
    when<WhenT extends RawExpr<boolean>, ThenT extends RawExpr<this["result"] extends sd.AssertDelegate<any> ? ReturnType<this["result"]> : NonNullPrimitiveExpr>>(whenExpr: WhenT, thenExpr: ThenT): (CaseConditionUtil.When<this, WhenT, ThenT>);
    nullableWhen<WhenT extends RawExpr<boolean>, ThenT extends RawExpr<this["result"] extends sd.AssertDelegate<any> ? ReturnType<this["result"]> | null : PrimitiveExpr>>(whenExpr: WhenT, thenExpr: ThenT): (CaseConditionUtil.NullableWhen<this, WhenT, ThenT>);
    else<ElseT extends RawExpr<Exclude<ReturnType<Extract<this, CaseConditionUtil.AfterWhenCase>["result"]>, null>>>(this: Extract<this, CaseConditionUtil.AfterWhenCase>, elseExpr: ElseT): (CaseConditionUtil.Else<Extract<this, CaseConditionUtil.AfterWhenCase>, ElseT>);
    nullableElse<ElseT extends RawExpr<ReturnType<Extract<this, CaseConditionUtil.AfterWhenCase>["result"]> | null>>(this: Extract<this, CaseConditionUtil.AfterWhenCase>, elseExpr: ElseT): (CaseConditionUtil.NullableElse<Extract<this, CaseConditionUtil.AfterWhenCase>, ElseT>);
    end(this: Extract<this, CaseConditionUtil.AfterWhenCase>): (CaseConditionUtil.End<Extract<this, CaseConditionUtil.AfterWhenCase>>);
}
