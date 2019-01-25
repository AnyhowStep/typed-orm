import { ColumnMap } from "../../column-map";
import { ColumnIdentifier } from "../../../column-identifier";
import { ColumnIdentifierMapUtil } from "../../../column-identifier-map";
export declare type HasColumnIdentifier<ColumnMapT extends ColumnMap, ColumnIdentifierT extends ColumnIdentifier> = (ColumnIdentifierMapUtil.HasColumnIdentifier<ColumnMapT, ColumnIdentifierT>);
export declare function hasColumnIdentifier<ColumnMapT extends ColumnMap, ColumnIdentifierT extends ColumnIdentifier>(columnMap: ColumnMapT, columnIdentifier: ColumnIdentifierT): (ColumnIdentifierMapUtil.HasColumnIdentifier<ColumnMapT, ColumnIdentifierT>);
export declare function assertHasColumnIdentifier(columnMap: ColumnMap, columnIdentifier: ColumnIdentifier): void;
export declare function assertHasColumnIdentifiers(columnMap: ColumnMap, columnIdentifiers: ColumnIdentifier[]): void;
