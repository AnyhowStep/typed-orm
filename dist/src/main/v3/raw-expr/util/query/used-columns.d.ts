import { RawExpr } from "../../raw-expr";
import { PrimitiveExpr } from "../../../primitive-expr";
import { IExpr } from "../../../expr";
import { IColumn, ColumnUtil } from "../../../column";
import { IQuery } from "../../../query";
import { IJoin } from "../../../join";
import { IExprSelectItem } from "../../../expr-select-item";
export declare type UsedColumns<RawExprT extends RawExpr<any>> = (RawExprT extends PrimitiveExpr ? [] : RawExprT extends IExpr ? RawExprT["usedColumns"] : RawExprT extends IColumn ? RawExprT[] : RawExprT extends IQuery ? (RawExprT["_parentJoins"] extends IJoin[] ? ColumnUtil.FromJoinArray<RawExprT["_parentJoins"]>[] : []) : RawExprT extends IExprSelectItem ? RawExprT["usedColumns"] : never);
export declare function usedColumns<RawExprT extends RawExpr<any>>(rawExpr: RawExprT): UsedColumns<RawExprT>;
