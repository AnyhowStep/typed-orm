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
    type UnionFromColumnMap<ColumnMapT extends ColumnMap> = (FromColumn<ColumnMapT[Extract<keyof ColumnMapT, string>]>);
    type UnionFromSelectItem<SelectItemT extends SelectItem> = (SelectItemT extends IColumn ? ColumnIdentifierUtil.FromColumn<SelectItemT> : SelectItemT extends IExprSelectItem ? {
        readonly tableAlias: SelectItemT["tableAlias"];
        readonly name: SelectItemT["alias"];
    } : SelectItemT extends ColumnMap ? UnionFromColumnMap<SelectItemT> : never);
    type UnionFromSelectItemArray<SelectsT extends SelectItem[]> = ({
        [index in keyof SelectsT]: (SelectsT[index] extends SelectItem ? UnionFromSelectItem<SelectsT[index]> : never);
    }[keyof SelectsT]);
    type UnionFromSelectItemArrayIgnoreIndex<SelectsT extends SelectItem[], IgnoreIndexT extends Extract<keyof SelectsT, string>> = ({
        [index in Exclude<Extract<keyof SelectsT, string>, IgnoreIndexT>]: (SelectsT[index] extends SelectItem ? UnionFromSelectItem<SelectsT[index]> : never);
    }[Exclude<Extract<keyof SelectsT, string>, IgnoreIndexT>]);
    type IsEqual<A extends ColumnIdentifier, B extends ColumnIdentifier> = (string extends A["tableAlias"] ? boolean : string extends B["tableAlias"] ? boolean : A["tableAlias"] extends B["tableAlias"] ? (string extends A["name"] ? boolean : string extends B["name"] ? boolean : A["name"] extends B["name"] ? true : false) : false);
    function isEqual<A extends ColumnIdentifier, B extends ColumnIdentifier>(a: A, b: B): IsEqual<A, B>;
    function assertIsEqual(a: ColumnIdentifier, b: ColumnIdentifier): void;
}
//# sourceMappingURL=column-identifier.d.ts.map