import {Expr} from "../expr";
import {Column} from "../column";
import {SelectBuilder} from "../select-builder";
import {Tuple} from "../tuple";
import {SelectValue, AnySelectValue} from "../select-value";

export type SelectValueBuilder<TypeT> = SelectBuilder<{
    hasSelect : true,
    hasFrom : any,
    hasUnion : any,
    
    joins : any,
    selects : (
        Tuple<AnySelectValue> &
        { length : 1 } &
        {
            "0": SelectValue<any, TypeT>
        }
    ),
    aggregateDelegate : any,
}>;

export type AllowedExprConstant = number|string|boolean|Date|null|undefined;
export type RawExpr<TypeT> = (
    (
        //TODO `undefined` constant should be mapped to `null`, maybe; unsure
        TypeT extends AllowedExprConstant ?
            TypeT :
            never
    )|
    Expr<any, TypeT>|
    Column<any, any, TypeT>|
    SelectValueBuilder<TypeT>
);
export type AnyRawExpr = RawExpr<any>;

export type RawExprNoUsedRef<TypeT> = (
    (
        //TODO `undefined` constant should be mapped to `null`, maybe; unsure
        TypeT extends AllowedExprConstant ?
            TypeT :
            never
    )|
    Expr<{}, TypeT>|
    Column<any, any, TypeT>|
    SelectValueBuilder<TypeT>
);