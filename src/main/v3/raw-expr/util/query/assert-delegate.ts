import * as sd from "schema-decorator";
import {RawExpr} from "../../raw-expr";
import {ExprUtil} from "../../../expr";
import {ColumnUtil} from "../../../column";
import {QueryUtil} from "../../../query";
import * as dataType from "../../../data-type";
import {ExprSelectItemUtil} from "../../../expr-select-item";
import {TypeOf} from "./type-of";

export type AssertDelegate<RawExprT extends RawExpr<any>> = (
    sd.AssertDelegate<TypeOf<RawExprT>>
);
export function assertDelegate<RawExprT extends RawExpr<any>> (
    rawExpr : RawExprT
) : AssertDelegate<RawExprT> {
    //Check primitive cases first
    if (typeof rawExpr == "number") {
        return dataType.double() as any;
    }
    if (typeof rawExpr == "bigint") {
        return dataType.bigint() as any;
    }
    if (typeof rawExpr == "string") {
        return sd.literal(rawExpr) as any;
    }
    if (typeof rawExpr == "boolean") {
        return (rawExpr ?
            dataType.true() :
            dataType.false()
        ) as any;
    }
    if (rawExpr instanceof Date) {
        return dataType.dateTime(3) as any;
    }
    if (rawExpr instanceof Buffer) {
        return sd.buffer() as any;
    }
    if (rawExpr === null) {
        return sd.nil() as any;
    }

    if (ExprUtil.isExpr(rawExpr)) {
        return rawExpr.assertDelegate as any;
    }

    if (ColumnUtil.isColumn(rawExpr)) {
        return rawExpr.assertDelegate as any;
    }

    if (
        QueryUtil.isQuery(rawExpr) &&
        QueryUtil.isOneSelectItemQuery(rawExpr) &&
        QueryUtil.isZeroOrOneRowQuery(rawExpr)
    ) {
        return QueryUtil.assertDelegate(rawExpr) as any;
    }

    if (ExprSelectItemUtil.isExprSelectItem(rawExpr)) {
        return rawExpr.assertDelegate as any;
    }

    throw new Error(`Unknown rawExpr ${sd.toTypeStr(rawExpr)}`);
}