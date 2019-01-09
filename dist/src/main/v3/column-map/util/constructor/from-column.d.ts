import { IColumn } from "../../../column";
export declare type FromColumn<ColumnT extends IColumn> = (ColumnT extends IColumn ? {
    readonly [columnName in ColumnT["name"]]: ColumnT;
} : never);
export declare function fromColumn<ColumnT extends IColumn>(column: ColumnT): FromColumn<ColumnT>;
//# sourceMappingURL=from-column.d.ts.map