import * as sd from "schema-decorator";
import { ColumnRef } from "./column-ref";
import { RawExpr, RawExprUtil } from "./raw-expr";
import { QueryStringTree } from "./query-string-tree";
export interface ExprData {
    readonly usedRef: ColumnRef;
    readonly assertDelegate: sd.AssertDelegate<any>;
}
export interface IExpr<DataT extends ExprData = ExprData> {
    readonly usedRef: DataT["usedRef"];
    readonly assertDelegate: DataT["assertDelegate"];
    readonly queryStringTree: QueryStringTree;
}
export declare class Expr<DataT extends ExprData> implements IExpr<DataT> {
    readonly usedRef: DataT["usedRef"];
    readonly assertDelegate: DataT["assertDelegate"];
    readonly queryStringTree: QueryStringTree;
    constructor(data: DataT, queryStringTree: QueryStringTree);
}
export declare type IAnonymousTypedExpr<TypeT> = (IExpr<{
    usedRef: ColumnRef;
    assertDelegate: sd.AssertDelegate<TypeT>;
}>);
export declare namespace Expr {
    function isExpr(raw: any): raw is IExpr;
    type FromRawExpr<RawExprT extends RawExpr<any>> = (Expr<{
        usedRef: RawExprUtil.UsedRef<RawExprT>;
        assertDelegate: RawExprUtil.AssertDelegate<RawExprT>;
    }>);
    function fromRawExpr<RawExprT extends RawExpr<any>>(rawExpr: RawExprT): FromRawExpr<RawExprT>;
}
//# sourceMappingURL=expr.d.ts.map