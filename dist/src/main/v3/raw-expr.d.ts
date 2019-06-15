import * as sd from "type-mapping";
import { PrimitiveExpr } from "./primitive-expr";
import { IAnonymousTypedExpr, IExpr } from "./expr";
import { IAnonymousTypedColumn, IColumn } from "./column";
import { ColumnRefUtil } from "./column-ref";
import { QueryTree } from "./query-tree";
import { ColumnRef } from "./column-ref";
import { OneSelectItemQuery, ZeroOrOneRowQuery, OneRowQuery, MainQuery } from "./query/util";
import { IQuery, QueryUtil } from "./query";
import { IJoin } from "./join";
import { IAnonymousTypedExprSelectItem, IExprSelectItem } from "./expr-select-item";
import { UnionToIntersection } from "./type";
export declare type RawExpr<TypeT> = ((TypeT extends PrimitiveExpr ? TypeT : never) | IAnonymousTypedExpr<TypeT> | IAnonymousTypedColumn<TypeT> | (null extends TypeT ? (OneSelectItemQuery<TypeT> & ZeroOrOneRowQuery) : (OneSelectItemQuery<TypeT> & OneRowQuery)) | IAnonymousTypedExprSelectItem<TypeT>);
export declare type RawExprNoUsedRef<TypeT> = ((TypeT extends PrimitiveExpr ? TypeT : never) | IExpr<{
    usedRef: {};
    assertDelegate: sd.SafeMapper<TypeT>;
}> | (null extends TypeT ? (OneSelectItemQuery<TypeT> & ZeroOrOneRowQuery & MainQuery) : (OneSelectItemQuery<TypeT> & OneRowQuery & MainQuery)) | IExprSelectItem<{
    usedRef: {};
    assertDelegate: sd.SafeMapper<TypeT>;
    tableAlias: string;
    alias: string;
}>);
export declare namespace RawExprUtil {
    type UsedRef<RawExprT extends RawExpr<any>> = (RawExprT extends PrimitiveExpr ? {} : RawExprT extends IExpr ? RawExprT["usedRef"] : RawExprT extends IColumn ? ColumnRefUtil.FromColumn<RawExprT> : RawExprT extends IQuery ? (RawExprT["_parentJoins"] extends IJoin[] ? ColumnRefUtil.FromJoinArray<Extract<RawExprT["_parentJoins"], IJoin[]>> : {}) : RawExprT extends IExprSelectItem ? RawExprT["usedRef"] : never);
    function usedRef<RawExprT extends RawExpr<any>>(rawExpr: RawExprT): UsedRef<RawExprT>;
    type TypeOf<RawExprT extends RawExpr<any>> = (RawExprT extends PrimitiveExpr ? RawExprT : RawExprT extends IExpr ? ReturnType<RawExprT["assertDelegate"]> : RawExprT extends IColumn ? ReturnType<RawExprT["assertDelegate"]> : RawExprT extends OneSelectItemQuery<any> & ZeroOrOneRowQuery ? QueryUtil.TypeOf<RawExprT> : RawExprT extends IExprSelectItem ? ReturnType<RawExprT["assertDelegate"]> : never);
    type AssertDelegate<RawExprT extends RawExpr<any>> = (sd.SafeMapper<TypeOf<RawExprT>>);
    function assertDelegate<RawExprT extends RawExpr<any>>(rawExpr: RawExprT): AssertDelegate<RawExprT>;
    function queryTree(rawExpr: RawExpr<any>): QueryTree;
    type IntersectUsedRefTuple<ArrT extends RawExpr<any>[]> = (ArrT[number] extends never ? {} : Extract<UnionToIntersection<RawExprUtil.UsedRef<ArrT[number]>>, ColumnRef>);
    function intersectUsedRefTuple<ArrT extends RawExpr<any>[]>(...arr: ArrT): IntersectUsedRefTuple<ArrT>;
}
