import * as sd from "schema-decorator";
import { ColumnRef } from "./column-ref";
import { RawExpr, RawExprUtil } from "./raw-expr";
import { QueryTree } from "./query-tree";
import { IExprSelectItem } from "./expr-select-item";
import { ALIASED } from "./constants";
import { PrimitiveExpr } from "./primitive-expr";
export interface ExprData {
    readonly usedRef: ColumnRef;
    readonly assertDelegate: sd.AssertDelegate<any>;
}
export interface IExpr<DataT extends ExprData = ExprData> {
    readonly usedRef: DataT["usedRef"];
    readonly assertDelegate: DataT["assertDelegate"];
    readonly queryTree: QueryTree;
}
export declare class Expr<DataT extends ExprData> implements IExpr<DataT> {
    readonly usedRef: DataT["usedRef"];
    readonly assertDelegate: DataT["assertDelegate"];
    readonly queryTree: QueryTree;
    constructor(data: DataT, queryTree: QueryTree);
    as<AliasT extends string>(alias: AliasT): ExprUtil.As<this, AliasT>;
}
export declare type IAnonymousTypedExpr<TypeT> = (IExpr<{
    usedRef: ColumnRef;
    assertDelegate: sd.AssertDelegate<TypeT>;
}>);
export declare namespace ExprUtil {
    function isExpr(raw: any): raw is IExpr;
    type FromRawExpr<RawExprT extends RawExpr<PrimitiveExpr>> = (Expr<{
        usedRef: RawExprUtil.UsedRef<RawExprT>;
        assertDelegate: RawExprUtil.AssertDelegate<RawExprT>;
    }>);
    function fromRawExpr<RawExprT extends RawExpr<PrimitiveExpr>>(rawExpr: RawExprT): FromRawExpr<RawExprT>;
    type As<ExprT extends IExpr, AliasT extends string> = (Expr<{
        readonly usedRef: ExprT["usedRef"];
        readonly assertDelegate: ExprT["assertDelegate"];
    }> & IExprSelectItem<{
        readonly usedRef: ExprT["usedRef"];
        readonly assertDelegate: ExprT["assertDelegate"];
        readonly tableAlias: typeof ALIASED;
        readonly alias: AliasT;
    }>);
    function as<ExprT extends IExpr, AliasT extends string>(expr: ExprT, alias: AliasT): As<ExprT, AliasT>;
}
//# sourceMappingURL=expr.d.ts.map