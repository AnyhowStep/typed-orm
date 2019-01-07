import { IColumn } from "../../column";
export declare type ToInterface<ColumnT extends IColumn> = (ColumnT extends IColumn ? IColumn<{
    readonly tableAlias: ColumnT["tableAlias"];
    readonly name: ColumnT["name"];
    readonly assertDelegate: ColumnT["assertDelegate"];
}> : never);
//# sourceMappingURL=to-interface.d.ts.map