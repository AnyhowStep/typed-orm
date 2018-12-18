import { ColumnIdentifierMap } from "../column-identifier-map";
import { ColumnIdentifier, ColumnIdentifierUtil } from "../../column-identifier";
export declare type IsSubset<A extends ColumnIdentifierMap, B extends ColumnIdentifierMap> = (string extends Extract<keyof A, string> ? boolean : string extends Extract<keyof B, string> ? boolean : Extract<keyof A, string> extends Extract<keyof B, string> ? ({
    [columnName in Extract<keyof A, string>]: (ColumnIdentifierUtil.IsEqual<A[columnName], B[columnName]>);
}[Extract<keyof A, string>]) : false);
export declare function isSubset<A extends ColumnIdentifierMap, B extends ColumnIdentifierMap>(a: A, b: B): IsSubset<A, B>;
export declare function assertIsSubset(a: ColumnIdentifierMap, b: ColumnIdentifierMap): void;
export declare function assertIsColumnNameSubset(a: ColumnIdentifierMap, b: ColumnIdentifierMap): void;
export declare type HasColumnIdentifier<ColumnMapT extends ColumnIdentifierMap, ColumnIdentifierT extends ColumnIdentifier> = (keyof ColumnMapT extends never ? false : ColumnMapT extends ColumnIdentifierMap ? (ColumnIdentifierT extends ColumnIdentifier ? (string extends keyof ColumnMapT ? boolean : ColumnIdentifier extends ColumnIdentifierT ? boolean : string extends ColumnIdentifierT["name"] ? (string extends ColumnIdentifierT["tableAlias"] ? boolean : ColumnIdentifierT["tableAlias"] extends ColumnIdentifierUtil.FromColumnIdentifierMap<ColumnMapT>["tableAlias"] ? boolean : false) : ColumnIdentifierT["name"] extends keyof ColumnMapT ? (string extends ColumnIdentifierT["tableAlias"] ? boolean : ColumnIdentifierT["tableAlias"] extends ColumnMapT[ColumnIdentifierT["name"]]["tableAlias"] ? (ColumnIdentifierT["name"] extends ColumnMapT[ColumnIdentifierT["name"]]["name"] ? true : false) : false) : false) : never) : never);
export declare function hasColumnIdentifier<ColumnMapT extends ColumnIdentifierMap, ColumnIdentifierT extends ColumnIdentifier>(columnMap: ColumnMapT, columnIdentifier: ColumnIdentifierT): (HasColumnIdentifier<ColumnMapT, ColumnIdentifierT>);
export declare function assertHasColumnIdentifier(columnMap: ColumnIdentifierMap, columnIdentifier: ColumnIdentifier): void;
export declare function assertHasColumnIdentifiers(columnMap: ColumnIdentifierMap, columnIdentifiers: ColumnIdentifier[]): void;
//# sourceMappingURL=predicate.d.ts.map