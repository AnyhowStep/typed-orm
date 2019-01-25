import { IColumn } from "../../../column";
export declare type FromColumn<ColumnT extends IColumn> = (ColumnT extends IColumn ? {
    readonly tableAlias: ColumnT["tableAlias"];
    readonly name: ColumnT["name"];
} : never);
export declare function fromColumn<ColumnT extends IColumn>(column: ColumnT): FromColumn<ColumnT>;
