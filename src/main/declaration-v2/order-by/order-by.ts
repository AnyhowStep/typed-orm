import {ColumnReferences, ColumnReferencesUtil} from "../column-references";
import {Expr, AnyExpr} from "../expr";
import {AnyColumn} from "../column";

export const ASCENDING : true = true;
export const DESCENDING : false = false;

//TODO If working with OrderBy and OrderByValue gets too unwieldly,
//Refactor into separate files
export type OrderByValue<
    ColumnReferencesT extends ColumnReferences
> = (
    Expr<
        ColumnReferencesUtil.Partial<ColumnReferencesT>,
        any
    > |
    ColumnReferencesUtil.Columns<ColumnReferencesT>
);

export type AnyOrderByValue = (
    AnyExpr |
    AnyColumn
);

export type OrderBy<
    ColumnReferencesT extends ColumnReferences
> = (
    //Defaults to ASCENDING
    OrderByValue<ColumnReferencesT> |
    [
        OrderByValue<ColumnReferencesT>,
        //true for ASCENDING, false for DESCENDING
        boolean
    ]
);
export type AnyOrderBy = (
    AnyOrderByValue |
    [
        AnyOrderByValue,
        boolean
    ]
)