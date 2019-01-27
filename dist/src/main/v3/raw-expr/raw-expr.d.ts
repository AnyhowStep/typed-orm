import * as sd from "schema-decorator";
import { PrimitiveExpr } from "../primitive-expr";
import { IAnonymousTypedExpr, IExpr } from "../expr";
import { IAnonymousTypedColumn } from "../column";
import { OneSelectItemQuery, ZeroOrOneRowQuery, OneRowQuery, MainQuery } from "../query/util";
import { IAnonymousTypedExprSelectItem, IExprSelectItem } from "../expr-select-item";
export declare type RawExpr<TypeT> = ((TypeT extends PrimitiveExpr ? TypeT : never) | IAnonymousTypedExpr<TypeT> | IAnonymousTypedColumn<TypeT> | (null extends TypeT ? (OneSelectItemQuery<TypeT> & ZeroOrOneRowQuery) : (OneSelectItemQuery<TypeT> & OneRowQuery)) | IAnonymousTypedExprSelectItem<TypeT>);
export declare type RawExprNoUsedRef<TypeT> = ((TypeT extends PrimitiveExpr ? TypeT : never) | IExpr<{
    usedColumns: never[];
    assertDelegate: sd.AssertDelegate<TypeT>;
}> | (null extends TypeT ? (OneSelectItemQuery<TypeT> & ZeroOrOneRowQuery & MainQuery) : (OneSelectItemQuery<TypeT> & OneRowQuery & MainQuery)) | IExprSelectItem<{
    usedColumns: never[];
    assertDelegate: sd.AssertDelegate<TypeT>;
    tableAlias: string;
    alias: string;
}>);
