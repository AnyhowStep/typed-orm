import { IExpr } from "../../expr";
import { ASC, DESC, SortDirection } from "../../../order";
export declare type Asc<ExprT extends IExpr> = ([ExprT, typeof ASC]);
export declare function asc<ExprT extends IExpr>(expr: ExprT): Asc<ExprT>;
export declare type Desc<ExprT extends IExpr> = ([ExprT, typeof DESC]);
export declare function desc<ExprT extends IExpr>(expr: ExprT): Desc<ExprT>;
export declare type Sort<ExprT extends IExpr> = ([ExprT, SortDirection]);
export declare function sort<ExprT extends IExpr>(expr: ExprT, sortDirection: SortDirection): Sort<ExprT>;
//# sourceMappingURL=sort.d.ts.map