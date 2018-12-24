import {IExpr} from "../../expr";
import {ASC, DESC, SortDirection} from "../../../order";

export type Asc<ExprT extends IExpr> = (
    [ExprT, typeof ASC]
);
export function asc<
    ExprT extends IExpr
> (expr : ExprT) : Asc<ExprT> {
    return [expr, ASC];
}

export type Desc<ExprT extends IExpr> = (
    [ExprT, typeof DESC]
);
export function desc<
    ExprT extends IExpr
> (expr : ExprT) : Desc<ExprT> {
    return [expr, DESC];
}

export type Sort<ExprT extends IExpr> = (
    [ExprT, SortDirection]
);
export function sort<
    ExprT extends IExpr
> (expr : ExprT, sortDirection : SortDirection) : Sort<ExprT> {
    return [expr, sortDirection];
}