import {IColumn, Column} from "./column";
import {ColumnMap, ColumnMapUtil} from "./column-map";
import {SelectItem} from "./select-item";
import {IExprSelectItem, ExprSelectItemUtil} from "./expr-select-item";

export interface ColumnIdentifier {
    readonly tableAlias : string;
    readonly name : string;
}

export namespace ColumnIdentifierUtil {
    export type FromColumn<ColumnT extends IColumn> = (
        ColumnT extends IColumn ?
        {
            readonly tableAlias : ColumnT["tableAlias"],
            readonly name : ColumnT["name"],
        } :
        never
    );
    export function fromColumn<ColumnT extends IColumn> (
        column : ColumnT
    ) : FromColumn<ColumnT> {
        const result : {
            readonly tableAlias : ColumnT["tableAlias"],
            readonly name : ColumnT["name"],
        } = {
            tableAlias : column.tableAlias,
            name : column.name,
        };
        return result as FromColumn<ColumnT>;
    }
    export type FromExprSelectItem<ExprSelectItemT extends IExprSelectItem> = (
        ExprSelectItemT extends IExprSelectItem ?
        {
            readonly tableAlias : ExprSelectItemT["tableAlias"],
            readonly name : ExprSelectItemT["alias"],
        } :
        never
    );
    export function fromExprSelectItem<ExprSelectItemT extends IExprSelectItem> (
        exprSelectItem : ExprSelectItemT
    ) : FromExprSelectItem<ExprSelectItemT> {
        const result : {
            readonly tableAlias : ExprSelectItemT["tableAlias"],
            readonly name : ExprSelectItemT["alias"],
        } = {
            tableAlias : exprSelectItem.tableAlias,
            name : exprSelectItem.alias,
        };
        return result as FromExprSelectItem<ExprSelectItemT>;
    }
    export type FromColumnMap<ColumnMapT extends ColumnMap> = (
        ColumnMapT extends ColumnMap ?
        FromColumn<ColumnMapT[Extract<keyof ColumnMapT, string>]> :
        never
    );
    export function fromColumnMap<ColumnMapT extends ColumnMap> (
        columnMap : ColumnMapT
    ) : FromColumnMap<ColumnMapT>[] {
        const result : ColumnIdentifier[] = [];
        for (let columnName in columnMap) {
            result.push(fromColumn(columnMap[columnName]));
        }
        return result as FromColumnMap<ColumnMapT>[];
    }

    export type FromSelectItem<SelectItemT extends SelectItem> = (
        SelectItemT extends SelectItem ?
        (
            FromColumn<Extract<SelectItemT, IColumn>> |
            FromExprSelectItem<Extract<SelectItemT, IExprSelectItem>> |
            FromColumnMap<Extract<SelectItemT, ColumnMap>>
        ) :
        never
    );
    export function fromSelectItem<SelectItemT extends SelectItem> (
        selectItem : SelectItemT
    ) : FromSelectItem<SelectItemT>[] {
        if (Column.isColumn(selectItem)) {
            return [fromColumn(selectItem)] as any;
        } else if (ExprSelectItemUtil.isExprSelectItem(selectItem)) {
            return [fromExprSelectItem(selectItem)] as any;
        } else if (ColumnMapUtil.isColumnMap(selectItem)) {
            return fromColumnMap(selectItem) as any;
        } else {
            throw new Error(`Unknown select item`);
        }
    }
    export type FromSelectItemArrayIgnoreIndex<
        SelectsT extends SelectItem[],
        IgnoreIndexT extends Extract<keyof SelectsT, string>
    > = (
        {
            [index in Exclude<Extract<keyof SelectsT, string>, IgnoreIndexT>] : (
                SelectsT[index] extends SelectItem ?
                FromSelectItem<SelectsT[index]> :
                never
            )
        }[Exclude<Extract<keyof SelectsT, string>, IgnoreIndexT>]
    );

    export type IsEqual<
        A extends ColumnIdentifier,
        B extends ColumnIdentifier
    > = (
        string extends A["tableAlias"] ?
        boolean :
        string extends B["tableAlias"] ?
        boolean :
        A["tableAlias"] extends B["tableAlias"] ?
        (
            string extends A["name"] ?
            boolean :
            string extends B["name"] ?
            boolean :
            A["name"] extends B["name"] ?
            true :
            false
        ) :
        false
    );
    export function isEqual<
        A extends ColumnIdentifier,
        B extends ColumnIdentifier
    > (a : A, b : B) : IsEqual<A, B> {
        return (
            a.tableAlias == b.tableAlias &&
            a.name == b.name
        ) as any;
    }
    export function assertIsEqual (a : ColumnIdentifier, b : ColumnIdentifier) {
        if (a.tableAlias != b.tableAlias) {
            throw new Error(`Table alias mismatch ${a.tableAlias} != ${b.tableAlias}`);
        }
        if (a.name != b.name) {
            throw new Error(`Name mismatch ${a.name} != ${b.name}`);
        }
    }
}