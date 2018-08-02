import { ColumnReferences, ColumnReferencesUtil } from "../column-references";
import { ColumnCollection } from "../column-collection";
import { AnyColumn } from "../column";
export declare type GroupBy<ColumnReferencesT extends ColumnReferences> = (ColumnReferencesUtil.ColumnCollections<ColumnReferencesT> | ColumnReferencesUtil.Columns<ColumnReferencesT>);
export declare type AnyGroupBy = (ColumnCollection | AnyColumn);
//# sourceMappingURL=group-by.d.ts.map