import { ColumnIdentifierRef } from "../column-identifier-ref";
import { ColumnIdentifier } from "../../column-identifier";
import { ColumnIdentifierMapUtil } from "../../column-identifier-map";
import { ColumnNames } from "./query";
export declare type HasColumnIdentifier<ColumnIdentifierRefT extends ColumnIdentifierRef, ColumnIdentifierT extends ColumnIdentifier> = (keyof ColumnIdentifierRefT extends never ? false : ColumnIdentifierRefT extends ColumnIdentifierRef ? (ColumnIdentifierT extends ColumnIdentifier ? (string extends keyof ColumnIdentifierRefT ? boolean : string extends ColumnIdentifierT["tableAlias"] ? (string extends ColumnIdentifierT["name"] ? boolean : ColumnIdentifierT["name"] extends ColumnNames<ColumnIdentifierRefT> ? boolean : false) : ColumnIdentifierT["tableAlias"] extends keyof ColumnIdentifierRefT ? (ColumnIdentifierMapUtil.HasColumnIdentifier<ColumnIdentifierRefT[ColumnIdentifierT["tableAlias"]], ColumnIdentifierT>) : false) : never) : never);
export declare function hasColumnIdentifier<ColumnIdentifierRefT extends ColumnIdentifierRef, ColumnIdentifierT extends ColumnIdentifier>(columnRef: ColumnIdentifierRefT, columnIdentifier: ColumnIdentifierT): (HasColumnIdentifier<ColumnIdentifierRefT, ColumnIdentifierT>);
export declare function assertHasColumnIdentifier(columnRef: ColumnIdentifierRef, columnIdentifier: ColumnIdentifier): void;
export declare function assertHasColumnIdentifiers(columnRef: ColumnIdentifierRef, columnIdentifiers: ColumnIdentifier[]): void;
//# sourceMappingURL=predicate.d.ts.map