import { IColumn } from "../../column";
import { IExprSelectItem } from "../../../expr-select-item";
export declare type As<ColumnT extends IColumn, AliasT extends string> = (IExprSelectItem<{
    readonly usedColumns: ColumnT[];
    readonly assertDelegate: ColumnT["assertDelegate"];
    readonly tableAlias: ColumnT["tableAlias"];
    readonly alias: AliasT;
}>);
export declare function as<ColumnT extends IColumn, AliasT extends string>(column: ColumnT, alias: AliasT): As<ColumnT, AliasT>;
