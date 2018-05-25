import {ColumnReferences, ColumnReferencesUtil} from "../column-references";
import {AliasedExpr} from "../aliased-expr";
import {Column} from "../column";

export type SelectValue<ColumnReferencesT extends ColumnReferences, TypeT> = (
    AliasedExpr<
        ColumnReferencesUtil.Partial<ColumnReferencesT>,
        "__expr",
        any,
        TypeT
    > |
    Extract<
        ColumnReferencesUtil.Columns<ColumnReferencesT>,
        Column<any, any, TypeT>
    >
);
export type AnySelectValue = SelectValue<any, any>;
