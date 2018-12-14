import {ColumnIdentifier, ColumnIdentifierUtil} from "../../column-identifier";
import {ColumnMap} from "../../column-map";
import {IColumn} from "../../column";
import {IExprSelectItem} from "../../expr-select-item";

export type FromColumn<ColumnT extends IColumn> = (
    ColumnT extends IColumn ?
    {
        readonly [columnName in ColumnT["name"]] : (
            ColumnIdentifierUtil.FromColumn<ColumnT>
        )
    } :
    never
);
export type FromExprSelectItem<ExprSelectItemT extends IExprSelectItem> = (
    ExprSelectItemT extends IExprSelectItem ?
    {
        readonly [columnName in ExprSelectItemT["alias"]] : (
            ColumnIdentifierUtil.FromExprSelectItem<ExprSelectItemT>
        )
    } :
    never
);

export type FromColumnMap<ColumnMapT extends ColumnMap> = (
    {
        readonly [columnName in Extract<keyof ColumnMapT, string>] : (
            ColumnIdentifierUtil.FromColumn<ColumnMapT[columnName]>
        )
    }
);
export function fromColumnMap<ColumnMapT extends ColumnMap> (
    columnMap : ColumnMapT
) : FromColumnMap<ColumnMapT> {
    return Object.keys(columnMap).reduce<{
        [columnName : string] : ColumnIdentifier
    }>(
        (memo, columnName) => {
            memo[columnName] = ColumnIdentifierUtil.fromColumn(columnMap[columnName]);
            return memo;
        },
        {}
    ) as FromColumnMap<ColumnMapT>;
}