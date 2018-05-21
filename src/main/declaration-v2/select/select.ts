import {ColumnReferences, ColumnReferencesUtil} from "../column-references";
import {AliasedExpr, AnyAliasedExpr} from "../aliased-expr";
import {ColumnCollection} from "../column-collection";
import {AnyColumn} from "../column";

export type Select<
    ColumnReferencesT extends ColumnReferences
> = (
    (AliasedExpr<
        ColumnReferencesUtil.Partial<ColumnReferencesT>,
        "__expr",
        any,
        any
    >)|
    ColumnReferencesUtil.ColumnCollections<ColumnReferencesT>|
    ColumnReferencesUtil.Columns<ColumnReferencesT>
);
export type AnySelect = (
    AnyAliasedExpr |
    ColumnCollection |
    AnyColumn
);
