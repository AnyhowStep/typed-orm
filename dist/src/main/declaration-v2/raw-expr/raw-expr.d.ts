import { Expr } from "../expr";
import { Column } from "../column";
import { SelectBuilder } from "../select-builder";
import { Tuple } from "../tuple";
import { SelectValue, AnySelectValue } from "../select-value";
export declare type SelectValueBuilder<TypeT> = SelectBuilder<{
    hasSelect: true;
    hasFrom: any;
    hasUnion: any;
    joins: any;
    selects: (Tuple<AnySelectValue> & {
        length: 1;
    } & {
        "0": SelectValue<any, TypeT>;
    });
    aggregateDelegate: any;
    hasParentJoins: any;
    parentJoins: any;
}>;
export declare type AllowedExprConstant = number | string | boolean | Date | null | undefined;
export declare type RawExpr<TypeT> = ((TypeT extends AllowedExprConstant ? TypeT : never) | Expr<any, TypeT> | Column<any, any, TypeT> | SelectValueBuilder<TypeT>);
export declare type AnyRawExpr = RawExpr<any>;
export declare type RawExprNoUsedRef<TypeT> = ((TypeT extends AllowedExprConstant ? TypeT : never) | Expr<{}, TypeT> | Column<any, any, TypeT> | SelectValueBuilder<TypeT>);
