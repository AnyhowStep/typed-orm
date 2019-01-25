import { IColumn } from "../../../column";
import { ColumnIdentifierMapUtil } from "../../../column-identifier-map";
import { ColumnIdentifierRef } from "../../column-identifier-ref";
import { Writable } from "../../../type";
export declare type FromColumn<ColumnT extends IColumn> = (ColumnT extends IColumn ? {
    readonly [tableAlias in ColumnT["tableAlias"]]: (ColumnIdentifierMapUtil.FromColumn<ColumnT>);
} : never);
export declare function appendColumn(ref: Writable<ColumnIdentifierRef>, column: IColumn): Writable<ColumnIdentifierRef>;
