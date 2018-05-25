import {ColumnReferences, ColumnReferencesUtil} from "../column-references";
import {ColumnCollection} from "../column-collection";
import {AnyColumn} from "../column";

export type GroupBy<
    ColumnReferencesT extends ColumnReferences
> = (
    ColumnReferencesUtil.ColumnCollections<ColumnReferencesT>|
    ColumnReferencesUtil.Columns<ColumnReferencesT>
);
export type AnyGroupBy = (
    ColumnCollection |
    AnyColumn
);
