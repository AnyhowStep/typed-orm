import { IColumn } from "../../column";
import { IExprSelectItem } from "../../../expr-select-item";
import { ColumnRefUtil } from "../../../column-ref";
export declare type As<ColumnT extends IColumn, AliasT extends string> = (IExprSelectItem<{
    readonly usedRef: ColumnRefUtil.FromColumn<ColumnT>;
    readonly assertDelegate: ColumnT["assertDelegate"];
    readonly tableAlias: ColumnT["tableAlias"];
    readonly alias: AliasT;
}>);
export declare function as<ColumnT extends IColumn, AliasT extends string>(column: ColumnT, alias: AliasT): As<ColumnT, AliasT>;
