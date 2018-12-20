import * as sd from "schema-decorator";
import { RawExpr } from "../../../../../raw-expr";
import { PrimitiveExpr, NonNullPrimitiveExpr } from "../../../../../primitive-expr";
import { ColumnRef } from "../../../../../column-ref";
import { QueryTreeArray } from "../../../../../query-tree";
import * as CaseUtil from "./util";
export interface CaseData {
    readonly usedRef: ColumnRef;
    readonly value: sd.AssertDelegate<any>;
    readonly result: sd.AssertDelegate<any> | undefined;
}
export interface ICase<DataT extends CaseData = CaseData> {
    readonly usedRef: DataT["usedRef"];
    readonly value: DataT["value"];
    readonly result: DataT["result"];
    readonly queryTree: QueryTreeArray;
}
export declare class Case<DataT extends CaseData> implements ICase<DataT> {
    readonly usedRef: DataT["usedRef"];
    readonly value: DataT["value"];
    readonly result: DataT["result"];
    readonly queryTree: QueryTreeArray;
    constructor(data: DataT, queryTree: QueryTreeArray);
    when<WhenT extends RawExpr<ReturnType<this["value"]>>, ThenT extends RawExpr<this["result"] extends sd.AssertDelegate<any> ? ReturnType<this["result"]> : NonNullPrimitiveExpr>>(whenExpr: WhenT, thenExpr: ThenT): (CaseUtil.When<this, WhenT, ThenT>);
    nullableWhen<WhenT extends RawExpr<ReturnType<this["value"]>>, ThenT extends RawExpr<this["result"] extends sd.AssertDelegate<any> ? ReturnType<this["result"]> | null : PrimitiveExpr>>(whenExpr: WhenT, thenExpr: ThenT): (CaseUtil.NullableWhen<this, WhenT, ThenT>);
    else<ElseT extends RawExpr<Exclude<ReturnType<Extract<this, CaseUtil.AfterWhenCase>["result"]>, null>>>(this: Extract<this, CaseUtil.AfterWhenCase>, elseExpr: ElseT): (CaseUtil.Else<Extract<this, CaseUtil.AfterWhenCase>, ElseT>);
    nullableElse<ElseT extends RawExpr<ReturnType<Extract<this, CaseUtil.AfterWhenCase>["result"]> | null>>(this: Extract<this, CaseUtil.AfterWhenCase>, elseExpr: ElseT): (CaseUtil.NullableElse<Extract<this, CaseUtil.AfterWhenCase>, ElseT>);
    end(this: Extract<this, CaseUtil.AfterWhenCase>): (CaseUtil.End<Extract<this, CaseUtil.AfterWhenCase>>);
}
//# sourceMappingURL=case.d.ts.map