import { ColumnIdentifierUtil } from "../../../column-identifier";
import { IColumn } from "../../../column";
export declare type FromColumn<ColumnT extends IColumn> = (ColumnT extends IColumn ? {
    readonly [columnName in ColumnT["name"]]: (ColumnIdentifierUtil.FromColumn<ColumnT>);
} : never);
