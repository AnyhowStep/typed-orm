import * as sd from "schema-decorator";
import {RawExpr} from "../../../../../raw-expr";
import {PrimitiveExpr, NonNullPrimitiveExpr} from "../../../../../primitive-expr";
import {IColumn} from "../../../../../column";
import {QueryTreeArray} from "../../../../../query-tree";
import * as CaseValueUtil from "./util";

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
export interface CaseValueData {
    readonly usedColumns : IColumn[],
    readonly value : sd.AssertDelegate<any>,
    readonly result : sd.AssertDelegate<any>|undefined,
}
export interface ICaseValue<DataT extends CaseValueData=CaseValueData> {
    readonly usedColumns : DataT["usedColumns"];
    readonly value : DataT["value"];
    readonly result : DataT["result"];
    readonly queryTree : QueryTreeArray;
}

export class CaseValue<DataT extends CaseValueData> implements ICaseValue<DataT> {
    readonly usedColumns : DataT["usedColumns"];
    readonly value : DataT["value"];
    readonly result : DataT["result"];
    readonly queryTree : QueryTreeArray;

    constructor (
        data : DataT,
        queryTree : QueryTreeArray
    ) {
        this.usedColumns = data.usedColumns;
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
        CaseValueUtil.When<this, WhenT, ThenT>
    ) {
        return CaseValueUtil.when(this, whenExpr, thenExpr);
    }
    nullableWhen<
        WhenT extends RawExpr<ReturnType<this["value"]>>,
        ThenT extends RawExpr<
            this["result"] extends sd.AssertDelegate<any> ?
            ReturnType<this["result"]>|null :
            PrimitiveExpr
        >
    >(whenExpr : WhenT, thenExpr : ThenT) : (
        CaseValueUtil.NullableWhen<this, WhenT, ThenT>
    ) {
        return CaseValueUtil.nullableWhen(this, whenExpr, thenExpr);
    }
    else<
        ElseT extends RawExpr<
            Exclude<ReturnType<Extract<this, CaseValueUtil.AfterWhenCase>["result"]>, null>
        >
    > (
        this : Extract<this, CaseValueUtil.AfterWhenCase>,
        elseExpr : ElseT
    ) : (
        CaseValueUtil.Else<Extract<this, CaseValueUtil.AfterWhenCase>, ElseT>
    ) {
        return CaseValueUtil.else(this, elseExpr);
    }
    nullableElse<
        ElseT extends RawExpr<
            ReturnType<Extract<this, CaseValueUtil.AfterWhenCase>["result"]>|null
        >
    > (
        this : Extract<this, CaseValueUtil.AfterWhenCase>,
        elseExpr : ElseT
    ) : (
        CaseValueUtil.NullableElse<Extract<this, CaseValueUtil.AfterWhenCase>, ElseT>
    ) {
        return CaseValueUtil.nullableElse(this, elseExpr);
    };
    end (
        this : Extract<this, CaseValueUtil.AfterWhenCase>
    ) : (
        CaseValueUtil.End<Extract<this, CaseValueUtil.AfterWhenCase>>
    ) {
        return CaseValueUtil.end(this);
    }
}
