import { ColumnIdentifierUtil } from "../../column-identifier";
import { ColumnMap } from "../../column-map";
import { IColumn } from "../../column";
import { IExprSelectItem } from "../../expr-select-item";
export declare type FromColumn<ColumnT extends IColumn> = (ColumnT extends IColumn ? {
    readonly [columnName in ColumnT["name"]]: (ColumnIdentifierUtil.FromColumn<ColumnT>);
} : never);
export declare type FromExprSelectItem<ExprSelectItemT extends IExprSelectItem> = (ExprSelectItemT extends IExprSelectItem ? {
    readonly [columnName in ExprSelectItemT["alias"]]: (ColumnIdentifierUtil.FromExprSelectItem<ExprSelectItemT>);
} : never);
export declare type FromColumnMap<ColumnMapT extends ColumnMap> = ({
    readonly [columnName in Extract<keyof ColumnMapT, string>]: (ColumnIdentifierUtil.FromColumn<ColumnMapT[columnName]>);
});
export declare function fromColumnMap<ColumnMapT extends ColumnMap>(columnMap: ColumnMapT): FromColumnMap<ColumnMapT>;
//# sourceMappingURL=constructor.d.ts.map