import { ColumnReferences, ColumnReferencesUtil } from "../column-references";
import { AliasedExpr, AnyAliasedExpr } from "../aliased-expr";
import { ColumnCollection } from "../column-collection";
import { AnyColumn } from "../column";
export declare type Select<ColumnReferencesT extends ColumnReferences> = ({
    __DUMMY_FROM_TABLE: {};
} extends ColumnReferencesT ? AliasedExpr<{}, "__expr", any, any> : (AliasedExpr<ColumnReferencesUtil.Partial<ColumnReferencesT>, "__expr", any, any> | ColumnReferencesUtil.ColumnCollections<ColumnReferencesT> | ColumnReferencesUtil.Columns<ColumnReferencesT>));
export declare type AnySelect = (AnyAliasedExpr | ColumnCollection | AnyColumn);
//# sourceMappingURL=select.d.ts.map