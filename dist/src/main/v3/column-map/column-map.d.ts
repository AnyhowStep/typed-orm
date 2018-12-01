import * as sd from "schema-decorator";
import { IColumn, Column } from "../column";
import { IJoin } from "../join";
import { SelectItem, SingleValueSelectItem } from "../select-item";
import { ColumnIdentifier } from "../column-identifier";
import { SelectItemArrayUtil } from "../select-item-array";
import { IExprSelectItem } from "../expr-select-item";
export interface ColumnMap {
    readonly [columnName: string]: IColumn;
}
export declare namespace ColumnMapUtil {
    function isColumnMap(raw: any): raw is ColumnMap;
    type ToUnion<ColumnMapT extends ColumnMap> = (ColumnMapT extends ColumnMap ? ColumnMapT[Extract<keyof ColumnMapT, string>] : never);
    function toArray<ColumnMapT extends ColumnMap>(columnMap: ColumnMapT): ToUnion<ColumnMapT>[];
    type ToColumnNameUnion<ColumnMapT extends ColumnMap> = (ColumnMapT extends ColumnMap ? Extract<keyof ColumnMapT, string> : never);
    function toColumnNameArray<ColumnMapT extends ColumnMap>(columnMap: ColumnMapT): ToColumnNameUnion<ColumnMapT>[];
    type HasOneColumn<ColumnMapT extends ColumnMap> = (Extract<keyof ColumnMapT, string> extends never ? false : string extends Extract<keyof ColumnMapT, string> ? boolean : ({
        [columnName in Extract<keyof ColumnMapT, string>]: (Exclude<Extract<keyof ColumnMapT, string>, columnName>);
    }[Extract<keyof ColumnMapT, string>]) extends never ? true : false);
    function hasOneColumn<ColumnMapT extends ColumnMap>(columnMap: ColumnMapT): HasOneColumn<ColumnMapT>;
    type WithTableAlias<ColumnMapT extends ColumnMap, NewTableAliasT extends string> = ({
        readonly [columnName in keyof ColumnMapT]: (Column.WithTableAlias<ColumnMapT[columnName], NewTableAliasT>);
    });
    function withTableAlias<ColumnMapT extends ColumnMap, NewTableAliasT extends string>(columnMap: ColumnMapT, newTableAlias: NewTableAliasT): (WithTableAlias<ColumnMapT, NewTableAliasT>);
    type HasColumn<ColumnMapT extends ColumnMap, ColumnT extends IColumn> = (keyof ColumnMapT extends never ? false : ColumnMap extends ColumnMapT ? boolean : string extends ColumnT["name"] ? (string extends ColumnT["tableAlias"] ? (ReturnType<ColumnT["assertDelegate"]> extends ReturnType<ToUnion<ColumnMapT>["assertDelegate"]> ? boolean : false) : ColumnT["tableAlias"] extends ToUnion<ColumnMapT>["tableAlias"] ? (ReturnType<ColumnT["assertDelegate"]> extends ReturnType<{
        [columnName in Extract<keyof ColumnMapT, string>]: (ColumnT["tableAlias"] extends ColumnMapT[columnName]["tableAlias"] ? ColumnMapT[columnName]["assertDelegate"] : never);
    }[Extract<keyof ColumnMapT, string>]> ? boolean : false) : false) : ColumnT["name"] extends keyof ColumnMapT ? (string extends ColumnT["tableAlias"] ? (ReturnType<ColumnT["assertDelegate"]> extends ReturnType<ColumnMapT[ColumnT["name"]]["assertDelegate"]> ? boolean : false) : ColumnT["tableAlias"] extends ColumnMapT[ColumnT["name"]]["tableAlias"] ? (ColumnT["name"] extends ColumnMapT[ColumnT["name"]]["name"] ? (ReturnType<ColumnT["assertDelegate"]> extends ReturnType<ColumnMapT[ColumnT["name"]]["assertDelegate"]> ? true : false) : false) : false) : false);
    type HasColumnIdentifier<ColumnMapT extends ColumnMap, ColumnIdentifierT extends ColumnIdentifier> = (keyof ColumnMapT extends never ? false : ColumnMap extends ColumnMapT ? boolean : string extends ColumnIdentifierT["name"] ? (string extends ColumnIdentifierT["tableAlias"] ? boolean : ColumnIdentifierT["tableAlias"] extends ToUnion<ColumnMapT>["tableAlias"] ? boolean : false) : ColumnIdentifierT["name"] extends keyof ColumnMapT ? (string extends ColumnIdentifierT["tableAlias"] ? boolean : ColumnIdentifierT["tableAlias"] extends ColumnMapT[ColumnIdentifierT["name"]]["tableAlias"] ? (ColumnIdentifierT["name"] extends ColumnMapT[ColumnIdentifierT["name"]]["name"] ? true : false) : false) : false);
    function hasColumnIdentifier<ColumnMapT extends ColumnMap, ColumnIdentifierT extends ColumnIdentifier>(columnMap: ColumnMapT, columnIdentifier: ColumnIdentifierT): (HasColumnIdentifier<ColumnMapT, ColumnIdentifierT>);
    function assertHasColumnIdentifier(columnMap: ColumnMap, columnIdentifier: ColumnIdentifier): void;
    type FromFieldArray<TableAliasT extends string, FieldsT extends sd.AnyField[]> = (FieldsT[number] extends never ? {} : {
        readonly [columnName in FieldsT[number]["name"]]: (Column<{
            tableAlias: TableAliasT;
            name: columnName;
            assertDelegate: Extract<FieldsT[number], {
                name: columnName;
            }>["assertDelegate"];
        }>);
    });
    function fromFieldArray<TableAliasT extends string, FieldsT extends sd.AnyField[]>(tableAlias: TableAliasT, fields: FieldsT): (FromFieldArray<TableAliasT, FieldsT>);
    type FromAssertMap<TableAliasT extends string, AssertMapT extends {
        readonly [columnName: string]: sd.AnyAssertFunc;
    }> = ({
        readonly [columnName in Extract<keyof AssertMapT, string>]: (Column<{
            tableAlias: TableAliasT;
            name: columnName;
            assertDelegate: sd.ToAssertDelegate<AssertMapT[columnName]>;
        }>);
    });
    function fromAssertMap<TableAliasT extends string, AssertMapT extends {
        readonly [columnName: string]: sd.AnyAssertFunc;
    }>(tableAlias: TableAliasT, assertMap: AssertMapT): (FromAssertMap<TableAliasT, AssertMapT>);
    type LeftIntersect<ColumnMapA extends ColumnMap, ColumnMapB extends ColumnMap> = ({
        readonly [columnName in Extract<keyof ColumnMapA, string>]: (columnName extends keyof ColumnMapB ? IColumn<{
            readonly tableAlias: ColumnMapA[columnName]["tableAlias"];
            readonly name: ColumnMapA[columnName]["name"];
            readonly assertDelegate: sd.AssertDelegate<ReturnType<ColumnMapA[columnName]["assertDelegate"]> & ReturnType<ColumnMapB[columnName]["assertDelegate"]>>;
        }> : ColumnMapA[columnName]);
    });
    function leftIntersect<ColumnMapA extends ColumnMap, ColumnMapB extends ColumnMap>(columnMapA: ColumnMapA, columnMapB: ColumnMapB): (LeftIntersect<ColumnMapA, ColumnMapB>);
    type Intersect<ColumnMapA extends ColumnMap, ColumnMapB extends ColumnMap> = (LeftIntersect<ColumnMapA, ColumnMapB> & {
        readonly [columnName in Exclude<Extract<keyof ColumnMapB, string>, keyof ColumnMapA>]: (ColumnMapB[columnName]);
    });
    function intersect<ColumnMapA extends ColumnMap, ColumnMapB extends ColumnMap>(columnMapA: ColumnMapA, columnMapB: ColumnMapB): (Intersect<ColumnMapA, ColumnMapB>);
    type ToColumnIdentifierUnion<ColumnMapT extends ColumnMap> = ({
        [columnName in Extract<keyof ColumnMapT, string>]: (Column.ToColumnIdentifier<ColumnMapT[columnName]>);
    }[Extract<keyof ColumnMapT, string>]);
    function toColumnIdentifierArray<ColumnMapT extends ColumnMap>(columnMap: ColumnMapT): ToColumnIdentifierUnion<ColumnMapT>[];
    type ToNullable<ColumnMapT extends ColumnMap> = ({
        readonly [columnName in keyof ColumnMapT]: (Column.ToNullable<ColumnMapT[columnName]>);
    });
    function toNullable<ColumnMapT extends ColumnMap>(columnMap: ColumnMapT): ToNullable<ColumnMapT>;
    type FromJoin<JoinT extends IJoin> = (true extends JoinT["nullable"] ? ColumnMapUtil.ToNullable<JoinT["columns"]> : JoinT["columns"]);
    function fromJoin<JoinT extends IJoin>(join: JoinT): FromJoin<JoinT>;
    type FromColumn<ColumnT extends IColumn> = ({
        readonly [columnName in ColumnT["name"]]: ColumnT;
    });
    function fromColumn<ColumnT extends IColumn>(column: ColumnT): FromColumn<ColumnT>;
    type FromSingleValueSelectItem<SelectItemT extends SingleValueSelectItem> = (FromColumn<Column.FromSingleValueSelectItem<SelectItemT>>);
    function fromSingleValueSelectItem<SelectItemT extends SingleValueSelectItem>(selectItem: SelectItemT): (FromSingleValueSelectItem<SelectItemT>);
    type FromSelectItem<SelectItemT extends SelectItem> = (SelectItemT extends SingleValueSelectItem ? FromSingleValueSelectItem<SelectItemT> : SelectItemT extends ColumnMap ? SelectItemT : never);
    function fromSelectItem<SelectItemT extends SelectItem>(selectItem: SelectItemT): FromSelectItem<SelectItemT>;
    type FromSelectItemArray<SelectsT extends SelectItem[]> = (SelectsT[number] extends never ? {} : {
        readonly [columnName in SelectItemArrayUtil.ToColumnNameUnion<SelectsT>]: (columnName extends Extract<SelectsT[number], IColumn>["name"] ? Column.FromSingleValueSelectItem<Extract<SelectsT[number], {
            name: columnName;
        }>> : columnName extends Extract<SelectsT[number], IExprSelectItem>["alias"] ? Column.FromSingleValueSelectItem<Extract<SelectsT[number], {
            alias: columnName;
        }>> : columnName extends ColumnMapUtil.ToColumnNameUnion<Extract<SelectsT[number], ColumnMap>> ? ColumnMapUtil.FindWithColumnName<Extract<SelectsT[number], ColumnMap>, columnName> : never);
    });
    function fromSelectItemArray<SelectsT extends SelectItem[]>(selects: SelectsT): FromSelectItemArray<SelectsT>;
    function assertIsSubset(a: ColumnMap, b: ColumnMap): void;
    type FindWithColumnName<ColumnMapT extends ColumnMap, ColumnNameT extends string> = (ColumnMapT extends ColumnMap ? (ColumnNameT extends keyof ColumnMapT ? ColumnMapT[ColumnNameT] : never) : never);
}
//# sourceMappingURL=column-map.d.ts.map