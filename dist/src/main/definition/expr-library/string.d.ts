import * as d from "../../declaration";
import { Expr } from "../expr";
export declare function concat<LeftT extends d.RawExpr<boolean | number | string | Date>, RightT extends d.RawExpr<boolean | number | string | Date>>(left: LeftT, ...rightArr: RightT[]): (Expr<d.ExprUsedColumns<LeftT> & d.ExprUsedColumns<RightT>, string>);
