import { IColumn } from "./column";
import { ColumnMap } from "./column-map";
import { SelectItem } from "./select-item";
import { IExprSelectItem } from "./expr-select-item";
export interface ColumnIdentifier {
    readonly tableAlias: string;
    readonly name: string;
}
export declare namespace ColumnIdentifierUtil {
    type FromColumn<ColumnT extends IColumn> = (ColumnT extends IColumn ? {
        readonly tableAlias: ColumnT["tableAlias"];
        readonly name: ColumnT["name"];
    } : never);
    function fromColumn<ColumnT extends IColumn>(column: ColumnT): FromColumn<ColumnT>;
    type FromExprSelectItem<ExprSelectItemT extends IExprSelectItem> = (ExprSelectItemT extends IExprSelectItem ? {
        readonly tableAlias: ExprSelectItemT["tableAlias"];
        readonly name: ExprSelectItemT["alias"];
    } : never);
    function fromExprSelectItem<ExprSelectItemT extends IExprSelectItem>(exprSelectItem: ExprSelectItemT): FromExprSelectItem<ExprSelectItemT>;
    type FromColumnMap<ColumnMapT extends ColumnMap> = (ColumnMapT extends ColumnMap ? FromColumn<ColumnMapT[Extract<keyof ColumnMapT, string>]> : never);
    function fromColumnMap<ColumnMapT extends ColumnMap>(columnMap: ColumnMapT): FromColumnMap<ColumnMapT>[];
    type FromSelectItem<SelectItemT extends SelectItem> = (SelectItemT extends SelectItem ? (FromColumn<Extract<SelectItemT, IColumn>> | FromExprSelectItem<Extract<SelectItemT, IExprSelectItem>> | FromColumnMap<Extract<SelectItemT, ColumnMap>>) : never);
    function fromSelectItem<SelectItemT extends SelectItem>(selectItem: SelectItemT): FromSelectItem<SelectItemT>[];
    type FromSelectItemArrayIgnoreIndex<SelectsT extends SelectItem[], IgnoreIndexT extends Extract<keyof SelectsT, string>> = ({
        [index in Exclude<Extract<keyof SelectsT, string>, IgnoreIndexT>]: (SelectsT[index] extends SelectItem ? FromSelectItem<SelectsT[index]> : never);
    }[Exclude<Extract<keyof SelectsT, string>, IgnoreIndexT>]);
    type IsEqual<A extends ColumnIdentifier, B extends ColumnIdentifier> = (string extends A["tableAlias"] ? boolean : string extends B["tableAlias"] ? boolean : A["tableAlias"] extends B["tableAlias"] ? (string extends A["name"] ? boolean : string extends B["name"] ? boolean : A["name"] extends B["name"] ? true : false) : false);
    function isEqual<A extends ColumnIdentifier, B extends ColumnIdentifier>(a: A, b: B): IsEqual<A, B>;
    function assertIsEqual(a: ColumnIdentifier, b: ColumnIdentifier): void;
}
//# sourceMappingURL=column-identifier.d.ts.map