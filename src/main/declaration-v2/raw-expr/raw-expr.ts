import {Expr} from "../expr";
import {Column} from "../column";
import {SelectBuilder} from "../select-builder";
import {Tuple} from "../tuple";
import {SelectValue} from "../select-value";

export type SelectValueBuilder<TypeT> = SelectBuilder<{
    hasSelect : true,
    hasFrom : any,
    hasUnion : any,

    joins : any,
    selects : (
        Tuple<any> &
        { length: 1; } &
        {
            "0": SelectValue<{
                readonly [tableAlias: string]: {
                    readonly [columnName: string]: Column<any, any, TypeT>;
                };
            }, TypeT>;
        }
    ),
    aggregateDelegate : any,

    hasParentJoins : any,
    parentJoins : any,
}>;
//Ugly hack to get this to work
export type AnySelectValueBuilder = {
    data : {
        hasSelect : true,
        selects : (
            Tuple<any> &
            { length: 1; } &
            {
                "0": any;
            }
        ),
    }
}/*SelectBuilder<{
    hasSelect : true,
    hasFrom : any,
    hasUnion : any,

    joins : any,
    selects : (
        Tuple<any> &
        { length: 1; } &
        {
            "0": any;
        }
    ),
    aggregateDelegate : any,

    hasParentJoins : any,
    parentJoins : any,
}>;*/

export type AllowedExprConstant = number|string|boolean|Date|Buffer|null|undefined;
export type RawExpr<TypeT> = (
    (
        //TODO `undefined` constant should be mapped to `null`, maybe; unsure
        TypeT extends AllowedExprConstant ?
            TypeT :
            never
    )|
    Expr<any, TypeT>|
    Column<any, any, TypeT>
    //This was allowed before but is not allowed anymore.
    //In the general case, we cannot guarantee that a SelectBuilder<> of this type
    //will not return `NULL`.
    //For example, if a table `payment` has zero rows,
    //Then, `SELECT amount FROM payment WHERE id = 1` will return
    //an empty result set, or `NULL` if used inside of an expression.
    //If you really want to use SELECT statements, use,
    //
    //COALESCE(
    //    (SELECT amount FROM payment WHERE id = 1),
    //    0 /*or some other default value*/
    //)
    //SelectValueBuilder<TypeT>
);
export type AnyRawExpr = (
    (
        AllowedExprConstant
    )|
    Expr<any, any>|
    Column<any, any, any>|
    AnySelectValueBuilder
);

export type SelectValueBuilderNoUsedRef<TypeT> = SelectBuilder<{
    hasSelect : true,
    hasFrom : any,
    hasUnion : any,

    joins : any,
    selects : (
        Tuple<any> &
        { length: 1; } &
        {
            "0": SelectValue<{
                readonly [tableAlias: string]: {
                    readonly [columnName: string]: Column<any, any, TypeT>;
                };
            }, TypeT>;
        }
    ),
    aggregateDelegate : any,

    hasParentJoins : false,
    parentJoins : any,
}>;
export type RawExprNoUsedRef<TypeT> = (
    (
        //TODO `undefined` constant should be mapped to `null`, maybe; unsure
        TypeT extends AllowedExprConstant ?
            TypeT :
            never
    )|
    Expr<{}, TypeT>|
    Column<any, any, TypeT>|
    SelectValueBuilderNoUsedRef<TypeT>
);