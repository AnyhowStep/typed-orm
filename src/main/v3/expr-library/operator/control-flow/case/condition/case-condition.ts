import * as sd from "type-mapping";
import {RawExpr} from "../../../../../raw-expr";
import {PrimitiveExpr, NonNullPrimitiveExpr} from "../../../../../primitive-expr";
import {ColumnRef} from "../../../../../column-ref";
import {QueryTreeArray} from "../../../../../query-tree";
import * as CaseConditionUtil from "./util";

/*
    case(value)
        .when(compareValue, result)
        .when(compareValue, result)
        .else(result)

    case(value)
        .when(compareValue, result)
        .when(compareValue, result)
        .end()
*/
export interface CaseConditionData {
    readonly usedRef : ColumnRef,
    readonly result : sd.SafeMapper<any>|undefined,
}
export interface ICaseCondition<DataT extends CaseConditionData=CaseConditionData> {
    readonly usedRef : DataT["usedRef"];
    readonly result : DataT["result"];
    readonly queryTree : QueryTreeArray;
}

export class CaseCondition<DataT extends CaseConditionData> implements ICaseCondition<DataT> {
    readonly usedRef : DataT["usedRef"];
    readonly result : DataT["result"];
    readonly queryTree : QueryTreeArray;

    constructor (
        data : DataT,
        queryTree : QueryTreeArray
    ) {
        this.usedRef = data.usedRef;
        this.result = data.result;
        this.queryTree = queryTree;
    }

    when<
        WhenT extends RawExpr<boolean>,
        ThenT extends RawExpr<
            this["result"] extends sd.SafeMapper<any> ?
            ReturnType<this["result"]> :
            NonNullPrimitiveExpr
        >
    >(whenExpr : WhenT, thenExpr : ThenT) : (
        CaseConditionUtil.When<this, WhenT, ThenT>
    ) {
        return CaseConditionUtil.when(this, whenExpr, thenExpr);
    }
    nullableWhen<
        WhenT extends RawExpr<boolean>,
        ThenT extends RawExpr<
            this["result"] extends sd.SafeMapper<any> ?
            ReturnType<this["result"]>|null :
            PrimitiveExpr
        >
    >(whenExpr : WhenT, thenExpr : ThenT) : (
        CaseConditionUtil.NullableWhen<this, WhenT, ThenT>
    ) {
        return CaseConditionUtil.nullableWhen(this, whenExpr, thenExpr);
    }
    else<
        ElseT extends RawExpr<
            Exclude<ReturnType<Extract<this, CaseConditionUtil.AfterWhenCase>["result"]>, null>
        >
    > (
        this : Extract<this, CaseConditionUtil.AfterWhenCase>,
        elseExpr : ElseT
    ) : (
        CaseConditionUtil.Else<Extract<this, CaseConditionUtil.AfterWhenCase>, ElseT>
    ) {
        return CaseConditionUtil.else(this, elseExpr);
    }
    nullableElse<
        ElseT extends RawExpr<
            ReturnType<Extract<this, CaseConditionUtil.AfterWhenCase>["result"]>|null
        >
    > (
        this : Extract<this, CaseConditionUtil.AfterWhenCase>,
        elseExpr : ElseT
    ) : (
        CaseConditionUtil.NullableElse<Extract<this, CaseConditionUtil.AfterWhenCase>, ElseT>
    ) {
        return CaseConditionUtil.nullableElse(this, elseExpr);
    };
    end (
        this : Extract<this, CaseConditionUtil.AfterWhenCase>
    ) : (
        CaseConditionUtil.End<Extract<this, CaseConditionUtil.AfterWhenCase>>
    ) {
        return CaseConditionUtil.end(this);
    }
}
