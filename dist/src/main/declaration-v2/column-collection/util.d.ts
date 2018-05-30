import * as sd from "schema-decorator";
import { ColumnCollection } from "./column-collection";
import { Column, AnyColumn, ColumnUtil } from "../column";
import { Tuple, TupleKeys } from "../tuple";
import { IsOneStringLiteral } from "../string-util";
export declare namespace ColumnCollectionUtil {
    type Columns<ColumnCollectionT extends ColumnCollection> = (ColumnCollectionT[keyof ColumnCollectionT]);
    type HasOneType<ColumnCollectionT extends ColumnCollection> = (IsOneStringLiteral<Extract<keyof ColumnCollectionT, string>> extends true ? true : false);
    function hasOneType(columnCollection: ColumnCollection): boolean;
    type Types<ColumnCollectionT extends ColumnCollection> = (HasOneType<ColumnCollectionT> extends true ? ({
        [columnName in Extract<keyof ColumnCollectionT, string>]: (ReturnType<ColumnCollectionT[columnName]["assertDelegate"]>);
    }[Extract<keyof ColumnCollectionT, string>]) : {
        [columnName in Extract<keyof ColumnCollectionT, string>]: (ReturnType<ColumnCollectionT[columnName]["assertDelegate"]>);
    });
    type ExcludeColumnNames<ColumnCollectionT extends ColumnCollection, ExcludeT extends string> = ({
        readonly [columnName in Exclude<Extract<keyof ColumnCollectionT, string>, ExcludeT>]: (ColumnCollectionT[columnName] extends AnyColumn ? ColumnCollectionT[columnName] : never);
    });
    function excludeColumnNames<ColumnCollectionT extends ColumnCollection, ExcludeT extends string>(columnCollection: ColumnCollectionT, exclude: ExcludeT[]): ExcludeColumnNames<ColumnCollectionT, ExcludeT>;
    type HasColumn<ColumnCollectionT extends ColumnCollection, ColumnT extends AnyColumn> = (ColumnT["name"] extends keyof ColumnCollectionT ? (ColumnT["tableAlias"] extends ColumnCollectionT[ColumnT["name"]]["tableAlias"] ? (ColumnT["name"] extends ColumnCollectionT[ColumnT["name"]]["name"] ? (ReturnType<ColumnT["assertDelegate"]> extends ReturnType<ColumnCollectionT[ColumnT["name"]]["assertDelegate"]> ? (true) : false) : false) : false) : false);
    function hasColumn<ColumnCollectionT extends ColumnCollection, ColumnT extends AnyColumn>(columnCollection: ColumnCollectionT, other: ColumnT): (HasColumn<ColumnCollectionT, ColumnT>);
    function assertHasColumn(columnCollection: ColumnCollection, column: AnyColumn): void;
    function assertHasColumns(columnCollection: ColumnCollection, arr: AnyColumn[]): void;
    type HasColumns<ColumnCollectionT extends ColumnCollection, ColumnT extends Tuple<AnyColumn>> = ({
        [index in TupleKeys<ColumnT>]: (ColumnT[index] extends AnyColumn ? HasColumn<ColumnCollectionT, ColumnT[index]> : never);
    }[TupleKeys<ColumnT>]);
    type ToNullable<ColumnCollectionT extends ColumnCollection> = ({
        readonly [columnName in Extract<keyof ColumnCollectionT, string>]: ColumnUtil.ToNullable<ColumnCollectionT[columnName]>;
    });
    function toNullable<ColumnCollectionT extends ColumnCollection>(columnCollection: ColumnCollectionT): (ToNullable<ColumnCollectionT>);
    type IsReplaceableBy<ColumnCollectionA extends ColumnCollection, ColumnCollectionB extends ColumnCollection> = (keyof ColumnCollectionA extends keyof ColumnCollectionB ? ({
        [columnName in Extract<keyof ColumnCollectionA, string>]: (ReturnType<ColumnCollectionA[columnName]["assertDelegate"]> extends ReturnType<ColumnCollectionB[columnName]["assertDelegate"]> ? true : false);
    }[Extract<keyof ColumnCollectionA, string>]) : false);
    function isReplaceableBy<ColumnCollectionA extends ColumnCollection, ColumnCollectionB extends ColumnCollection>(columnsA: ColumnCollectionA, columnsB: ColumnCollectionB): IsReplaceableBy<ColumnCollectionA, ColumnCollectionB>;
    type WithTableAlias<ColumnCollectionT extends ColumnCollection, NewTableAliasT extends string> = ({
        readonly [columnName in keyof ColumnCollectionT]: ColumnUtil.WithTableAlias<ColumnCollectionT[columnName], NewTableAliasT>;
    });
    function withTableAlias<ColumnCollectionT extends ColumnCollection, NewTableAliasT extends string>(columnCollection: ColumnCollectionT, newTableAlias: NewTableAliasT): WithTableAlias<ColumnCollectionT, NewTableAliasT>;
    type ReplaceColumnType<ColumnCollectionT extends ColumnCollection, TableAliasT extends string, ColumnNameT extends string, NewTypeT> = ({
        readonly [columnName in keyof ColumnCollectionT]: (ColumnCollectionT[columnName] extends Column<TableAliasT, ColumnNameT, any> ? ColumnUtil.WithType<ColumnCollectionT[columnName], NewTypeT> : ColumnCollectionT[columnName]);
    });
    function replaceColumnType<ColumnCollectionT extends ColumnCollection, TableAliasT extends string, ColumnNameT extends string, NewTypeT>(columns: ColumnCollectionT, tableAlias: TableAliasT, columnName: ColumnNameT, assertDelegate: sd.AssertDelegate<NewTypeT>): (ReplaceColumnType<ColumnCollectionT, TableAliasT, ColumnNameT, NewTypeT>);
    type AndType<ColumnCollectionA extends ColumnCollection, ColumnCollectionB extends ColumnCollection> = ({
        readonly [columnName in Extract<keyof ColumnCollectionA, string>]: (columnName extends keyof ColumnCollectionB ? (Column<ColumnCollectionA[columnName]["tableAlias"], ColumnCollectionA[columnName]["name"], (ReturnType<ColumnCollectionA[columnName]["assertDelegate"]> & ReturnType<ColumnCollectionB[columnName]["assertDelegate"]>)>) : (ColumnCollectionA[columnName]));
    });
    function andType<ColumnCollectionA extends ColumnCollection, ColumnCollectionB extends ColumnCollection>(columnsA: ColumnCollectionA, columnsB: ColumnCollectionB): (AndType<ColumnCollectionA, ColumnCollectionB>);
    type Merge<ColumnCollectionA extends ColumnCollection, ColumnCollectionB extends ColumnCollection> = (AndType<ColumnCollectionA, ColumnCollectionB> & ColumnCollectionB);
    function merge<ColumnCollectionA extends ColumnCollection, ColumnCollectionB extends ColumnCollection>(columnsA: ColumnCollectionA, columnsB: ColumnCollectionB): Merge<ColumnCollectionA, ColumnCollectionB>;
    type NullableColumnNames<ColumnCollectionT extends ColumnCollection> = ({
        [name in Extract<keyof ColumnCollectionT, string>]: (null extends ReturnType<ColumnCollectionT[name]["assertDelegate"]> ? name : never);
    }[Extract<keyof ColumnCollectionT, string>]);
    type ColumnNames<ColumnCollectionT extends ColumnCollection> = (Extract<keyof ColumnCollectionT, string>);
    function nullableColumnNames<ColumnCollectionT extends ColumnCollection>(columnCollection: ColumnCollectionT): NullableColumnNames<ColumnCollectionT>[];
    function columnNames<ColumnCollectionT extends ColumnCollection>(columnCollection: ColumnCollectionT): ColumnNames<ColumnCollectionT>[];
    type Type<ColumnCollectionT extends ColumnCollection> = ({
        [columnName in Extract<keyof ColumnCollectionT, string>]: (ReturnType<ColumnCollectionT[columnName]["assertDelegate"]>);
    });
    function assertDelegate<ColumnCollectionT extends ColumnCollection>(columnCollection: ColumnCollectionT, useColumnNames?: string[]): (sd.AssertDelegate<Type<ColumnCollectionT>>);
    function partialAssertDelegate<ColumnCollectionT extends ColumnCollection>(columnCollection: ColumnCollectionT, useColumnNames?: string[]): (sd.AssertDelegate<Partial<Type<ColumnCollectionT>>>);
    function allNullAssertDelegate<ColumnCollectionT extends ColumnCollection>(columnCollection: ColumnCollectionT, useColumnNames: string[]): (sd.AssertDelegate<{
        [columnName in Extract<keyof ColumnCollectionT, string>]: (null);
    }>);
    type ToColumnReferences<ColumnCollectionT extends ColumnCollection> = ({
        readonly [tableAlias in ColumnCollectionT[keyof ColumnCollectionT]["tableAlias"]]: ColumnCollectionT;
    });
    function toColumnReferences<ColumnCollectionT extends ColumnCollection>(columnCollection: ColumnCollectionT): any;
}
