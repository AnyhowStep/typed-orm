import { AnySelectBuilder } from "../select-builder";
import { WhereDelegate, WhereDelegateColumnReferences } from "./where-delegate";
import { ColumnReferencesUtil } from "../column-references";
import { Expr } from "../expr";
export declare namespace WhereDelegateUtil {
    function toColumnReferences<SelectBuilderT extends AnySelectBuilder>(selectBuilder: SelectBuilderT): (WhereDelegateColumnReferences<SelectBuilderT>);
    function execute<SelectBuilderT extends AnySelectBuilder, WhereDelegateT extends WhereDelegate<SelectBuilderT>>(selectBuilder: SelectBuilderT, delegate: WhereDelegateT): (Expr<ColumnReferencesUtil.Partial<WhereDelegateColumnReferences<SelectBuilderT>>, boolean>);
}
//# sourceMappingURL=util.d.ts.map