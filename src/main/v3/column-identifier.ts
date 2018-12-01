import {IColumn} from "./column";
import {ColumnMap} from "./column-map";
import {SelectItem} from "./select-item";
import {IExprSelectItem} from "./expr-select-item";

export interface ColumnIdentifier {
    readonly tableAlias : string;
    readonly name : string;
}

export namespace ColumnIdentifierUtil {
    export type FromColumn<ColumnT extends IColumn> = (
        {
            readonly tableAlias : ColumnT["tableAlias"],
            readonly name : ColumnT["name"],
        }
    );
    export function fromColumn<ColumnT extends IColumn> (
        column : ColumnT
    ) : FromColumn<ColumnT> {
        return {
            tableAlias : column.tableAlias,
            name : column.name,
        };
    }

    export type UnionFromColumnMap<ColumnMapT extends ColumnMap> = (
        {
            [columnName in Extract<keyof ColumnMapT, string>] : (
                FromColumn<ColumnMapT[columnName]>
            )
        }[Extract<keyof ColumnMapT, string>]
    );
    export type UnionFromSelectItem<SelectItemT extends SelectItem> = (
        SelectItemT extends IColumn ?
        ColumnIdentifierUtil.FromColumn<SelectItemT> :
        SelectItemT extends IExprSelectItem ?
        {
            readonly tableAlias : SelectItemT["tableAlias"],
            readonly name : SelectItemT["alias"],
        } :
        SelectItemT extends ColumnMap ?
        UnionFromColumnMap<SelectItemT> :
        never
    );


    export type UnionFromSelectItemArray<SelectsT extends SelectItem[]> = (
        {
            [index in keyof SelectsT] : (
                SelectsT[index] extends SelectItem ?
                UnionFromSelectItem<SelectsT[index]> :
                never
            )
        }[keyof SelectsT]
    );
    export type UnionFromSelectItemArrayIgnoreIndex<
        SelectsT extends SelectItem[],
        IgnoreIndexT extends Extract<keyof SelectsT, string>
    > = (
        {
            [index in Exclude<Extract<keyof SelectsT, string>, IgnoreIndexT>] : (
                SelectsT[index] extends SelectItem ?
                UnionFromSelectItem<SelectsT[index]> :
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