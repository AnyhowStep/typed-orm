import * as sd from "schema-decorator";
import { PrimitiveExpr } from "./primitive-expr";
import { IAnonymousTypedExpr, IExpr } from "./expr";
import { IAnonymousTypedColumn, IColumn } from "./column";
import { TableSubquery } from "./table-subquery";
import { ColumnRefUtil } from "./column-ref";
import { QueryTree } from "./query-tree";
export declare type RawExpr<TypeT> = ((TypeT extends PrimitiveExpr ? TypeT : never) | IAnonymousTypedExpr<TypeT> | IAnonymousTypedColumn<TypeT> | (null extends TypeT ? TableSubquery.SingleValueOrEmpty<TypeT> : TableSubquery.SingleValue<TypeT>));
export declare namespace RawExprUtil {
    type UsedRef<RawExprT extends RawExpr<any>> = (RawExprT extends PrimitiveExpr ? {} : RawExprT extends IExpr ? RawExprT["usedRef"] : RawExprT extends IColumn ? ColumnRefUtil.FromColumn<RawExprT> : RawExprT extends TableSubquery.SingleValueOrEmpty<any> ? {} : never);
    function usedRef<RawExprT extends RawExpr<any>>(rawExpr: RawExprT): UsedRef<RawExprT>;
    type TypeOf<RawExprT extends RawExpr<any>> = (RawExprT extends PrimitiveExpr ? RawExprT : RawExprT extends IExpr ? ReturnType<RawExprT["assertDelegate"]> : RawExprT extends IColumn ? ReturnType<RawExprT["assertDelegate"]> : RawExprT extends TableSubquery.SingleValueOrEmpty<any> ? TableSubquery.TypeOf<RawExprT> : never);
    type AssertDelegate<RawExprT extends RawExpr<any>> = (RawExprT extends PrimitiveExpr ? sd.AssertDelegate<RawExprT> : RawExprT extends IExpr ? RawExprT["assertDelegate"] : RawExprT extends IColumn ? RawExprT["assertDelegate"] : RawExprT extends TableSubquery.SingleValueOrEmpty<any> ? TableSubquery.AssertDelegate<RawExprT> : never);
    function assertDelegate<RawExprT extends RawExpr<any>>(rawExpr: RawExprT): AssertDelegate<RawExprT>;
    function queryTree(rawExpr: RawExpr<any>): QueryTree;
}
//# sourceMappingURL=raw-expr.d.ts.map