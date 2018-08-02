import { Expr } from "../expr";
import { Column } from "../column";
import { SelectBuilder } from "../select-builder";
import { Tuple } from "../tuple";
import { SelectValue } from "../select-value";
export declare type SelectValueBuilder<TypeT> = SelectBuilder<{
    hasSelect: true;
    hasFrom: any;
    hasUnion: any;
    joins: any;
    selects: (Tuple<any> & {
        length: 1;
    } & {
        "0": SelectValue<{
            readonly [tableAlias: string]: {
                readonly [columnName: string]: Column<any, any, TypeT>;
            };
        }, TypeT>;
    });
    aggregateDelegate: any;
    hasParentJoins: any;
    parentJoins: any;
}>;
export declare type AnySelectValueBuilder = {
    data: {
        hasSelect: true;
        selects: (Tuple<any> & {
            length: 1;
        } & {
            "0": any;
        });
    };
};
export declare type AllowedExprConstant = number | string | boolean | Date | null | undefined;
export declare type RawExpr<TypeT> = ((TypeT extends AllowedExprConstant ? TypeT : never) | Expr<any, TypeT> | Column<any, any, TypeT>);
export declare type AnyRawExpr = ((AllowedExprConstant) | Expr<any, any> | Column<any, any, any> | AnySelectValueBuilder);
export declare type SelectValueBuilderNoUsedRef<TypeT> = SelectBuilder<{
    hasSelect: true;
    hasFrom: any;
    hasUnion: any;
    joins: any;
    selects: (Tuple<any> & {
        length: 1;
    } & {
        "0": SelectValue<{
            readonly [tableAlias: string]: {
                readonly [columnName: string]: Column<any, any, TypeT>;
            };
        }, TypeT>;
    });
    aggregateDelegate: any;
    hasParentJoins: false;
    parentJoins: any;
}>;
export declare type RawExprNoUsedRef<TypeT> = ((TypeT extends AllowedExprConstant ? TypeT : never) | Expr<{}, TypeT> | Column<any, any, TypeT> | SelectValueBuilderNoUsedRef<TypeT>);
//# sourceMappingURL=raw-expr.d.ts.map