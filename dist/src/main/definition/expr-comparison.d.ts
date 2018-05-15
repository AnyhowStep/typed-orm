import * as d from "../declaration";
import { Expr } from "./expr";
export declare function isNull<RawT extends d.RawExpr<any>>(expr: RawT): Expr<d.ExprUsedColumns<RawT>, boolean>;
export declare function isNotNull<RawT extends d.RawExpr<any>>(expr: RawT): Expr<d.ExprUsedColumns<RawT>, boolean>;
export declare function eq<LeftT extends d.RawExpr<any>, RightT extends d.RawExpr<any>>(left: LeftT, right: RightT): (null extends d.ExprType<LeftT> ? "Left expression is nullable, comparison with NULL yields NULL; consider narrowing" : null extends d.ExprType<RightT> ? "Right expression is nullable, comparison with NULL yields NULL; consider narrowing" : Expr<d.ExprUsedColumns<LeftT> & d.ExprUsedColumns<RightT>, boolean>);
export declare function notEq<LeftT extends d.RawExpr<any>, RightT extends d.RawExpr<any>>(left: LeftT, right: RightT): (null extends d.ExprType<LeftT> ? "Left expression is nullable, comparison with NULL yields NULL; consider narrowing" : null extends d.ExprType<RightT> ? "Right expression is nullable, comparison with NULL yields NULL; consider narrowing" : Expr<d.ExprUsedColumns<LeftT> & d.ExprUsedColumns<RightT>, boolean>);
export declare function eqAllowNull<LeftT extends d.RawExpr<any>, RightT extends d.RawExpr<any>>(left: LeftT, right: RightT): Expr<d.ExprUsedColumns<LeftT> & d.ExprUsedColumns<RightT>, boolean | null>;
export declare function notEqAllowNull<LeftT extends d.RawExpr<any>, RightT extends d.RawExpr<any>>(left: LeftT, right: RightT): Expr<d.ExprUsedColumns<LeftT> & d.ExprUsedColumns<RightT>, boolean | null>;
export declare function isIn<LeftT extends d.RawExpr<any>, RightT extends d.RawExpr<any>>(left: LeftT, ...rightArr: RightT[]): (null extends d.ExprType<LeftT> ? "Left expression is nullable, comparison with NULL yields NULL; consider narrowing" : null extends d.ExprType<RightT> ? "Right expression is nullable, comparison with NULL yields NULL; consider narrowing" : Expr<d.ExprUsedColumns<LeftT> & d.ExprUsedColumns<RightT>, boolean>);
export declare function isInAllowNull<LeftT extends d.RawExpr<any>, RightT extends d.RawExpr<any>>(left: LeftT, ...rightArr: RightT[]): (Expr<d.ExprUsedColumns<LeftT> & d.ExprUsedColumns<RightT>, boolean | null>);
