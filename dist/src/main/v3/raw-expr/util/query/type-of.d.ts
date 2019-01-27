import { RawExpr } from "../../raw-expr";
import { PrimitiveExpr } from "../../../primitive-expr";
import { IExpr } from "../../../expr";
import { IColumn } from "../../../column";
import { OneSelectItemQuery, ZeroOrOneRowQuery } from "../../../query/util";
import { QueryUtil } from "../../../query";
import { IExprSelectItem } from "../../../expr-select-item";
export declare type TypeOf<RawExprT extends RawExpr<any>> = (RawExprT extends PrimitiveExpr ? RawExprT : RawExprT extends IExpr ? ReturnType<RawExprT["assertDelegate"]> : RawExprT extends IColumn ? ReturnType<RawExprT["assertDelegate"]> : RawExprT extends OneSelectItemQuery<any> & ZeroOrOneRowQuery ? QueryUtil.TypeOf<RawExprT> : RawExprT extends IExprSelectItem ? ReturnType<RawExprT["assertDelegate"]> : never);
