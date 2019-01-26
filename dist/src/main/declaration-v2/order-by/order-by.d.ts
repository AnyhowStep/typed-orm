import { ColumnReferences, ColumnReferencesUtil } from "../column-references";
import { Expr, AnyExpr } from "../expr";
import { AnyColumn } from "../column";
export declare const ASCENDING: true;
export declare const DESCENDING: false;
export declare type OrderByValue<ColumnReferencesT extends ColumnReferences> = (Expr<ColumnReferencesUtil.Partial<ColumnReferencesT>, any> | ColumnReferencesUtil.Columns<ColumnReferencesT>);
export declare type AnyOrderByValue = (AnyExpr | AnyColumn);
export declare type OrderBy<ColumnReferencesT extends ColumnReferences> = (OrderByValue<ColumnReferencesT> | [OrderByValue<ColumnReferencesT>, boolean]);
export declare type AnyOrderBy = (AnyOrderByValue | [AnyOrderByValue, boolean]);
//# sourceMappingURL=order-by.d.ts.map