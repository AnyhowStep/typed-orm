import * as sd from "schema-decorator";
import { RawExpr } from "../../../../../raw-expr";
import { PrimitiveExpr, NonNullPrimitiveExpr } from "../../../../../primitive-expr";
import { ColumnRef } from "../../../../../column-ref";
import { QueryTreeArray } from "../../../../../query-tree";
import * as CaseValueUtil from "./util";
export interface CaseValueData {
    readonly usedRef: ColumnRef;
    readonly value: sd.AssertDelegate<any>;
    readonly result: sd.AssertDelegate<any> | undefined;
}
export interface ICaseValue<DataT extends CaseValueData = CaseValueData> {
    readonly usedRef: DataT["usedRef"];
    readonly value: DataT["value"];
    readonly result: DataT["result"];
    readonly queryTree: QueryTreeArray;
}
export declare class CaseValue<DataT extends CaseValueData> implements ICaseValue<DataT> {
    readonly usedRef: DataT["usedRef"];
    readonly value: DataT["value"];
    readonly result: DataT["result"];
    readonly queryTree: QueryTreeArray;
    constructor(data: DataT, queryTree: QueryTreeArray);
    when<WhenT extends RawExpr<ReturnType<this["value"]>>, ThenT extends RawExpr<this["result"] extends sd.AssertDelegate<any> ? ReturnType<this["result"]> : NonNullPrimitiveExpr>>(whenExpr: WhenT, thenExpr: ThenT): (CaseValueUtil.When<this, WhenT, ThenT>);
    nullableWhen<WhenT extends RawExpr<ReturnType<this["value"]>>, ThenT extends RawExpr<this["result"] extends sd.AssertDelegate<any> ? ReturnType<this["result"]> | null : PrimitiveExpr>>(whenExpr: WhenT, thenExpr: ThenT): (CaseValueUtil.NullableWhen<this, WhenT, ThenT>);
    else<ElseT extends RawExpr<Exclude<ReturnType<Extract<this, CaseValueUtil.AfterWhenCase>["result"]>, null>>>(this: Extract<this, CaseValueUtil.AfterWhenCase>, elseExpr: ElseT): (CaseValueUtil.Else<Extract<this, CaseValueUtil.AfterWhenCase>, ElseT>);
    nullableElse<ElseT extends RawExpr<ReturnType<Extract<this, CaseValueUtil.AfterWhenCase>["result"]> | null>>(this: Extract<this, CaseValueUtil.AfterWhenCase>, elseExpr: ElseT): (CaseValueUtil.NullableElse<Extract<this, CaseValueUtil.AfterWhenCase>, ElseT>);
    end(this: Extract<this, CaseValueUtil.AfterWhenCase>): (CaseValueUtil.End<Extract<this, CaseValueUtil.AfterWhenCase>>);
}
