import * as sd from "schema-decorator";
import {RawExpr} from "../../../../../raw-expr";
import {PrimitiveExpr, NonNullPrimitiveExpr} from "../../../../../primitive-expr";
import {ColumnRef} from "../../../../../column-ref";
import {QueryTreeArray} from "../../../../../query-tree";
import * as CaseUtil from "./util";

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
export interface CaseData {
    readonly usedRef : ColumnRef,
    readonly value : sd.AssertDelegate<any>,
    readonly result : sd.AssertDelegate<any>|undefined,
}
export interface ICase<DataT extends CaseData=CaseData> {
    readonly usedRef : DataT["usedRef"];
    readonly value : DataT["value"];
    readonly result : DataT["result"];
    readonly queryTree : QueryTreeArray;
}

export class Case<DataT extends CaseData> implements ICase<DataT> {
    readonly usedRef : DataT["usedRef"];
    readonly value : DataT["value"];
    readonly result : DataT["result"];
    readonly queryTree : QueryTreeArray;

    constructor (
        data : DataT,
        queryTree : QueryTreeArray
    ) {
        this.usedRef = data.usedRef;
        this.value = data.value;
        this.result = data.result;
        this.queryTree = queryTree;
    }

    when<
        WhenT extends RawExpr<ReturnType<this["value"]>>,
        ThenT extends RawExpr<
            this["result"] extends sd.AssertDelegate<any> ?
            ReturnType<this["result"]> :
            NonNullPrimitiveExpr
        >
    >(whenExpr : WhenT, thenExpr : ThenT) : (
        CaseUtil.When<this, WhenT, ThenT>
    ) {
        return CaseUtil.when(this, whenExpr, thenExpr);
    }
    nullableWhen<
        WhenT extends RawExpr<ReturnType<this["value"]>>,
        ThenT extends RawExpr<
            this["result"] extends sd.AssertDelegate<any> ?
            ReturnType<this["result"]>|null :
            PrimitiveExpr
        >
    >(whenExpr : WhenT, thenExpr : ThenT) : (
        CaseUtil.NullableWhen<this, WhenT, ThenT>
    ) {
        return CaseUtil.nullableWhen(this, whenExpr, thenExpr);
    }
    else<
        ElseT extends RawExpr<
            Exclude<ReturnType<Extract<this, CaseUtil.AfterWhenCase>["result"]>, null>
        >
    > (
        this : Extract<this, CaseUtil.AfterWhenCase>,
        elseExpr : ElseT
    ) : (
        CaseUtil.Else<Extract<this, CaseUtil.AfterWhenCase>, ElseT>
    ) {
        return CaseUtil.else(this, elseExpr);
    }
    nullableElse<
        ElseT extends RawExpr<
            ReturnType<Extract<this, CaseUtil.AfterWhenCase>["result"]>|null
        >
    > (
        this : Extract<this, CaseUtil.AfterWhenCase>,
        elseExpr : ElseT
    ) : (
        CaseUtil.NullableElse<Extract<this, CaseUtil.AfterWhenCase>, ElseT>
    ) {
        return CaseUtil.nullableElse(this, elseExpr);
    };
    end (
        this : Extract<this, CaseUtil.AfterWhenCase>
    ) : (
        CaseUtil.End<Extract<this, CaseUtil.AfterWhenCase>>
    ) {
        return CaseUtil.end(this);
    }
}
