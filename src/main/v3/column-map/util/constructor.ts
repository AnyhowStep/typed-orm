import * as sd from "schema-decorator";
import {Writable} from "../../type";
import {ColumnMap} from "../column-map";
import {toNullable, ToNullable} from "./operation";
import {FindWithColumnName} from "./query";
import {isColumnMap} from "./predicate";
import {IColumn, Column, ColumnUtil} from "../../column";
import {IJoin} from "../../join";
import {SelectItem, SingleValueSelectItem} from "../../select-item";
import {SelectItemArrayUtil} from "../../select-item-array";
import {IExprSelectItem, ExprSelectItemUtil} from "../../expr-select-item";
import {AssertMap} from "../../assert-map";
/*
    In general, having any[] -> {} conversions
    requires more care.
*/
export type FromFieldArray<
    TableAliasT extends string,
    FieldsT extends sd.AnyField[]
> = (
    FieldsT[number] extends never ?
    {} :
    {
        readonly [columnName in FieldsT[number]["name"]] : (
            Column<{
                tableAlias : TableAliasT,
                name : columnName,
                assertDelegate : Extract<FieldsT[number], { name : columnName }>["assertDelegate"]
            }>
        )
    }
);
export function fromFieldArray<
    TableAliasT extends string,
    FieldsT extends sd.AnyField[]
> (
    tableAlias : TableAliasT,
    fields : FieldsT
) : (
    FromFieldArray<TableAliasT, FieldsT>
) {
    const result : Writable<ColumnMap> = {};
    for (let field of fields) {
        result[field.name] = new Column({
            tableAlias : tableAlias,
            name : field.name,
            assertDelegate : field.assertDelegate,
        });
    }
    return result as FromFieldArray<TableAliasT, FieldsT>;
}
export type FromAssertMap<
    TableAliasT extends string,
    AssertMapT extends AssertMap
> = (
    {
        readonly [columnName in Extract<keyof AssertMapT, string>] : (
            Column<{
                tableAlias : TableAliasT,
                name : columnName,
                assertDelegate : sd.ToAssertDelegate<AssertMapT[columnName]>
            }>
        )
    }
);
export function fromAssertMap<
    TableAliasT extends string,
    AssertMapT extends {
        readonly [columnName : string] : sd.AnyAssertFunc
    }
> (
    tableAlias : TableAliasT,
    assertMap : AssertMapT
) : (
    FromAssertMap<TableAliasT, AssertMapT>
) {
    const result : Writable<ColumnMap> = {};
    for (let columnName in assertMap) {
        result[columnName] = new Column({
            tableAlias : tableAlias,
            name : columnName,
            assertDelegate : sd.toAssertDelegate(assertMap[columnName]),
        });
    }
    return result as FromAssertMap<TableAliasT, AssertMapT>;
}

export type FromJoin<JoinT extends IJoin> = (
    JoinT extends IJoin ?
    (
        true extends JoinT["nullable"] ?
        //We use nullable columns because when using LEFT/RIGHT JOINs,
        //the columns can become `null`, and we still want to allow joining
        //`null` with `int` columns
        ToNullable<JoinT["columns"]> :
        JoinT["columns"]
    ) :
    never
);
export function fromJoin<JoinT extends IJoin> (
    join : JoinT
) : FromJoin<JoinT> {
    if (join.nullable) {
        return toNullable(join.columns) as FromJoin<JoinT>;
    } else {
        return join.columns as FromJoin<JoinT>;
    }
}

export type FromColumn<ColumnT extends IColumn> = (
    ColumnT extends IColumn ?
    {
        readonly [columnName in ColumnT["name"]] : ColumnT
    } :
    never
);
export function fromColumn<ColumnT extends IColumn> (
    column : ColumnT
) : FromColumn<ColumnT> {
    return {
        [column.name] : column
    } as FromColumn<ColumnT>;
}

export type FromSingleValueSelectItem<SelectItemT extends SingleValueSelectItem> = (
    FromColumn<ColumnUtil.FromSingleValueSelectItem<SelectItemT>>
);
export function fromSingleValueSelectItem<
    SelectItemT extends SingleValueSelectItem
> (selectItem : SelectItemT) : (
    FromSingleValueSelectItem<SelectItemT>
) {
    return fromColumn(ColumnUtil.fromSingleValueSelectItem(selectItem));
}

export type FromSelectItem<SelectItemT extends SelectItem> = (
    SelectItemT extends SingleValueSelectItem ?
    FromSingleValueSelectItem<SelectItemT> :
    SelectItemT extends ColumnMap ?
    SelectItemT :
    never
);
export function fromSelectItem<SelectItemT extends SelectItem> (
    selectItem : SelectItemT
) : FromSelectItem<SelectItemT> {
    if (ColumnUtil.isColumn(selectItem)) {
        return fromColumn(selectItem) as any;
    } else if (ExprSelectItemUtil.isExprSelectItem(selectItem)) {
        return fromSingleValueSelectItem(selectItem) as any;
    } else if (isColumnMap(selectItem)) {
        return selectItem as any;
    } else {
        throw new Error(`Unknown select item`);
    }
}


//Assumes no duplicate columnName in SelectsT
export type FromSelectItemArray<SelectsT extends SelectItem[]> = (
    SelectsT[number] extends never ?
    {} :
    {
        readonly [columnName in SelectItemArrayUtil.ToColumnNameUnion<SelectsT>] : (
            columnName extends Extract<SelectsT[number], IColumn>["name"] ?
            ColumnUtil.FromSingleValueSelectItem<Extract<SelectsT[number], { name : columnName }>> :

            columnName extends Extract<SelectsT[number], IExprSelectItem>["alias"] ?
            ColumnUtil.FromSingleValueSelectItem<Extract<SelectsT[number], { alias : columnName }>> :

            columnName extends ColumnUtil.Name.FromColumnMap<Extract<SelectsT[number], ColumnMap>> ?
            FindWithColumnName<
                Extract<SelectsT[number], ColumnMap>,
                columnName
            > :

            never
        )
    }
);
//Assumes no duplicate columnName in SelectsT
export function fromSelectItemArray<SelectsT extends SelectItem[]> (
    selects : SelectsT
) : FromSelectItemArray<SelectsT> {
    const columnMaps = selects.map((selectItem) : ColumnMap => {
        return fromSelectItem(selectItem);
    });
    return Object.assign(
        {},
        ...columnMaps
    );
}

export type FromColumnArray<ColumnsT extends IColumn[]> = (
    {
        readonly [columnName in ColumnsT[number]["name"]] : (
            Extract<ColumnsT[number], { name : columnName }>
        )
    }
);