import * as sd from "schema-decorator";
import {RawExpr} from "../../raw-expr";
import {PrimitiveExpr} from "../../../primitive-expr";
import {IExpr, ExprUtil} from "../../../expr";
import {IColumn, ColumnUtil} from "../../../column";
import {IQuery, QueryUtil} from "../../../query";
import {IJoin} from "../../../join";
import {IExprSelectItem, ExprSelectItemUtil} from "../../../expr-select-item";

export type UsedColumns<RawExprT extends RawExpr<any>> = (
    RawExprT extends PrimitiveExpr ?
    [] :
    RawExprT extends IExpr ?
    RawExprT["usedColumns"] :
    RawExprT extends IColumn ?
    RawExprT[] :
    RawExprT extends IQuery ?
    (
        RawExprT["_parentJoins"] extends IJoin[] ?
        ColumnUtil.FromJoinArray<RawExprT["_parentJoins"]>[] :
        []
    ) :
    RawExprT extends IExprSelectItem ?
    RawExprT["usedColumns"] :
    never
);
export function usedColumns<RawExprT extends RawExpr<any>> (
    rawExpr : RawExprT
) : UsedColumns<RawExprT> {
    //Check primitive cases first
    if (typeof rawExpr == "number") {
        return [] as any;
    }
    if (typeof rawExpr == "bigint") {
        return [] as any;
    }
    if (typeof rawExpr == "string") {
        return [] as any;
    }
    if (typeof rawExpr == "boolean") {
        return [] as any;
    }
    if (rawExpr instanceof Date) {
        return [] as any;
    }
    if (rawExpr instanceof Buffer) {
        return [] as any;
    }
    if (rawExpr === null) {
        return [] as any;
    }

    if (ExprUtil.isExpr(rawExpr)) {
        return rawExpr.usedColumns as any;
    }

    if (ColumnUtil.isColumn(rawExpr)) {
        return [rawExpr] as any;
    }

    if (QueryUtil.isQuery(rawExpr)) {
        if (rawExpr._parentJoins == undefined) {
            return [] as any;
        } else {
            return ColumnUtil.Array.fromJoinArray(rawExpr._parentJoins) as any;
        }
    }

    if (ExprSelectItemUtil.isExprSelectItem(rawExpr)) {
        return rawExpr.usedColumns as any;
    }

    throw new Error(`Unknown rawExpr ${sd.toTypeStr(rawExpr)}`);
}