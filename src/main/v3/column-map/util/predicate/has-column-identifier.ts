import {ColumnMap} from "../../column-map";
import {ColumnIdentifier} from "../../../column-identifier";
import {ColumnIdentifierMapUtil} from "../../../column-identifier-map";

export type HasColumnIdentifier<
    ColumnMapT extends ColumnMap,
    ColumnIdentifierT extends ColumnIdentifier
> = (
    ColumnIdentifierMapUtil.HasColumnIdentifier<ColumnMapT, ColumnIdentifierT>
);
export function hasColumnIdentifier<
    ColumnMapT extends ColumnMap,
    ColumnIdentifierT extends ColumnIdentifier
> (columnMap : ColumnMapT, columnIdentifier : ColumnIdentifierT) : (
    ColumnIdentifierMapUtil.HasColumnIdentifier<ColumnMapT, ColumnIdentifierT>
) {
    return ColumnIdentifierMapUtil.hasColumnIdentifier(columnMap, columnIdentifier);
}
export function assertHasColumnIdentifier (columnMap : ColumnMap, columnIdentifier : ColumnIdentifier) {
    ColumnIdentifierMapUtil.assertHasColumnIdentifier(columnMap, columnIdentifier);
}
export function assertHasColumnIdentifiers (columnMap : ColumnMap, columnIdentifiers : ColumnIdentifier[]) {
    ColumnIdentifierMapUtil.assertHasColumnIdentifiers(columnMap, columnIdentifiers);
}