import {ColumnIdentifierMap} from "../../column-identifier-map";
import {ColumnIdentifier, ColumnIdentifierUtil} from "../../../column-identifier";

export type HasColumnIdentifier<
    ColumnMapT extends ColumnIdentifierMap,
    ColumnIdentifierT extends ColumnIdentifier
> = (
    keyof ColumnMapT extends never ?
    false :
    ColumnMapT extends ColumnIdentifierMap ?
    (
        ColumnIdentifierT extends ColumnIdentifier ?
        (
            //ColumnIdentifierMap extends ColumnMapT ?
            string extends keyof ColumnMapT ?
            boolean :
            ColumnIdentifier extends ColumnIdentifierT ?
            boolean :
            string extends ColumnIdentifierT["name"] ?
            (
                string extends ColumnIdentifierT["tableAlias"] ?
                boolean :
                ColumnIdentifierT["tableAlias"] extends ColumnIdentifierUtil.FromColumnIdentifierMap<ColumnMapT>["tableAlias"] ?
                boolean :
                false
            ) :
            ColumnIdentifierT["name"] extends keyof ColumnMapT ?
            (
                string extends ColumnIdentifierT["tableAlias"] ?
                boolean :
                ColumnIdentifierT["tableAlias"] extends ColumnMapT[ColumnIdentifierT["name"]]["tableAlias"] ?
                (
                    ColumnIdentifierT["name"] extends ColumnMapT[ColumnIdentifierT["name"]]["name"] ?
                    true :
                    false
                ) :
                false
            ) :
            false
        ) :
        never
    ) :
    never
);
export function hasColumnIdentifier<
    ColumnMapT extends ColumnIdentifierMap,
    ColumnIdentifierT extends ColumnIdentifier
> (columnMap : ColumnMapT, columnIdentifier : ColumnIdentifierT) : (
    HasColumnIdentifier<ColumnMapT, ColumnIdentifierT>
) {
    const column = columnMap[columnIdentifier.name];
    if (!ColumnIdentifierUtil.isColumnIdentifier(column)) {
        return false as HasColumnIdentifier<ColumnMapT, ColumnIdentifierT>;
    }
    return ColumnIdentifierUtil.isEqual(
        column,
        columnIdentifier
    ) as boolean as HasColumnIdentifier<ColumnMapT, ColumnIdentifierT>;
}
export function assertHasColumnIdentifier (columnMap : ColumnIdentifierMap, columnIdentifier : ColumnIdentifier) {
    if (!hasColumnIdentifier(columnMap, columnIdentifier)) {
        throw new Error(`Column ${columnIdentifier.tableAlias}.${columnIdentifier.name} does not exist in column identifier map`);
    }
}
export function assertHasColumnIdentifiers (columnMap : ColumnIdentifierMap, columnIdentifiers : ColumnIdentifier[]) {
    for (let columnIdentifier of columnIdentifiers) {
        assertHasColumnIdentifier(columnMap, columnIdentifier);
    }
}