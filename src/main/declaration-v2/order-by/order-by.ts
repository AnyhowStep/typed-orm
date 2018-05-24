import {ColumnReferences, ColumnReferencesUtil} from "../column-references";
import {Expr, AnyExpr} from "../expr";
import {AnyColumn} from "../column";

//TODO If working with OrderBy and OrderByValue gets too unwieldly,
//Refactor into separate files
export type OrderByValue<
    ColumnReferencesT extends ColumnReferences
> = (
    Expr<
        ColumnReferencesUtil.Partial<ColumnReferencesT>,
        boolean
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