import { ColumnMap } from "../column-map";
import { IColumn, ColumnUtil } from "../../column";
import { ColumnIdentifier } from "../../column-identifier";
import { ColumnIdentifierMapUtil } from "../../column-identifier-map";
export declare function isColumnMap(raw: any): raw is ColumnMap;
export declare type HasOneColumn<ColumnMapT extends ColumnMap> = (Extract<keyof ColumnMapT, string> extends never ? false : string extends Extract<keyof ColumnMapT, string> ? boolean : ({
    [columnName in Extract<keyof ColumnMapT, string>]: (Exclude<Extract<keyof ColumnMapT, string>, columnName>);
}[Extract<keyof ColumnMapT, string>]) extends never ? true : false);
export declare function hasOneColumn<ColumnMapT extends ColumnMap>(columnMap: ColumnMapT): HasOneColumn<ColumnMapT>;
export declare type HasColumn<ColumnMapT extends ColumnMap, ColumnT extends IColumn> = (keyof ColumnMapT extends never ? false : ColumnMap extends ColumnMapT ? boolean : string extends ColumnT["name"] ? (string extends ColumnT["tableAlias"] ? (ReturnType<ColumnT["assertDelegate"]> extends ReturnType<ColumnUtil.FromColumnMap<ColumnMapT>["assertDelegate"]> ? boolean : false) : ColumnT["tableAlias"] extends ColumnUtil.FromColumnMap<ColumnMapT>["tableAlias"] ? (ReturnType<ColumnT["assertDelegate"]> extends ReturnType<{
    [columnName in Extract<keyof ColumnMapT, string>]: (ColumnT["tableAlias"] extends ColumnMapT[columnName]["tableAlias"] ? ColumnMapT[columnName]["assertDelegate"] : never);
}[Extract<keyof ColumnMapT, string>]> ? boolean : false) : false) : ColumnT["name"] extends keyof ColumnMapT ? (string extends ColumnT["tableAlias"] ? (ReturnType<ColumnT["assertDelegate"]> extends ReturnType<ColumnMapT[ColumnT["name"]]["assertDelegate"]> ? boolean : false) : ColumnT["tableAlias"] extends ColumnMapT[ColumnT["name"]]["tableAlias"] ? (ColumnT["name"] extends ColumnMapT[ColumnT["name"]]["name"] ? (ReturnType<ColumnT["assertDelegate"]> extends ReturnType<ColumnMapT[ColumnT["name"]]["assertDelegate"]> ? true : false) : false) : false) : false);
export declare type HasColumnIdentifier<ColumnMapT extends ColumnMap, ColumnIdentifierT extends ColumnIdentifier> = (ColumnIdentifierMapUtil.HasColumnIdentifier<ColumnMapT, ColumnIdentifierT>);
export declare function hasColumnIdentifier<ColumnMapT extends ColumnMap, ColumnIdentifierT extends ColumnIdentifier>(columnMap: ColumnMapT, columnIdentifier: ColumnIdentifierT): (ColumnIdentifierMapUtil.HasColumnIdentifier<ColumnMapT, ColumnIdentifierT>);
export declare function assertHasColumnIdentifier(columnMap: ColumnMap, columnIdentifier: ColumnIdentifier): void;
export declare function assertHasColumnIdentifiers(columnMap: ColumnMap, columnIdentifiers: ColumnIdentifier[]): void;
export declare type IsAssignableSubset<A extends ColumnMap, B extends ColumnMap> = (Extract<keyof A, string> extends never ? true : string extends Extract<keyof A, string> ? boolean : string extends Extract<keyof B, string> ? boolean : Extract<keyof A, string> extends Extract<keyof B, string> ? ({
    [columnName in Extract<keyof A, string>]: (ColumnUtil.IsAssignableTo<A[columnName], B[columnName]>);
}[Extract<keyof A, string>]) : false);
//# sourceMappingURL=predicate.d.ts.map