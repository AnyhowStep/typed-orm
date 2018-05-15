import * as d from "../declaration";
import * as sd from "schema-decorator";
export declare function isAllowedExprConstant<RawExprT extends d.RawExpr<any>>(raw: RawExprT): boolean;
export declare function usedColumns<RawExprT extends d.RawExpr<any>>(raw: RawExprT): d.ExprUsedColumns<RawExprT>;
export declare function assertDelegate<RawExprT extends d.RawExpr<any>>(raw: RawExprT): sd.AssertDelegate<d.ExprType<RawExprT>>;
export declare function querify(raw: d.RawExpr<any>): string;
export declare function toExpr<RawExprT extends d.RawExpr<any>>(raw: RawExprT): d.RawToExpr<RawExprT>;
