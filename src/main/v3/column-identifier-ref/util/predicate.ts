import {ColumnIdentifierRef} from "../column-identifier-ref";
import {ColumnIdentifier, ColumnIdentifierUtil} from "../../column-identifier";
import {ColumnIdentifierMapUtil} from "../../column-identifier-map";

export type HasColumnIdentifier<
    ColumnIdentifierRefT extends ColumnIdentifierRef,
    ColumnIdentifierT extends ColumnIdentifier
> = (
    keyof ColumnIdentifierRefT extends never ?
    false :
    ColumnIdentifierRefT extends ColumnIdentifierRef ?
    (
        ColumnIdentifierT extends ColumnIdentifier ?
        (
            //ColumnIdentifierRef extends ColumnIdentifierRefT ?
            string extends keyof ColumnIdentifierRefT ?
            boolean :
            string extends ColumnIdentifierT["tableAlias"] ?
            (
                string extends ColumnIdentifierT["name"] ?
                boolean :
                ColumnIdentifierT["name"] extends ColumnIdentifierUtil.Name.FromColumnIdentifierRef<ColumnIdentifierRefT> ?
                boolean :
                false
            ) :
            ColumnIdentifierT["tableAlias"] extends keyof ColumnIdentifierRefT ?
            (
                ColumnIdentifierMapUtil.HasColumnIdentifier<
                    ColumnIdentifierRefT[ColumnIdentifierT["tableAlias"]],
                    ColumnIdentifierT
                >
            ) :
            false
        ) :
        never
    ) :
    never
);
export function hasColumnIdentifier<
    ColumnIdentifierRefT extends ColumnIdentifierRef,
    ColumnIdentifierT extends ColumnIdentifier
> (columnRef : ColumnIdentifierRefT, columnIdentifier : ColumnIdentifierT) : (
    HasColumnIdentifier<ColumnIdentifierRefT, ColumnIdentifierT>
) {
    if (!columnRef.hasOwnProperty(columnIdentifier.tableAlias)) {
        return false as any;
    }
    const columnMap = columnRef[columnIdentifier.tableAlias];
    return ColumnIdentifierMapUtil.hasColumnIdentifier(columnMap, columnIdentifier) as any;
}
export function assertHasColumnIdentifier (columnRef : ColumnIdentifierRef, columnIdentifier : ColumnIdentifier) {
    if (!hasColumnIdentifier(columnRef, columnIdentifier)) {
        throw new Error(`Column ${columnIdentifier.tableAlias}.${columnIdentifier.name} does not exist in column identifier ref`);
    }
}
export function assertHasColumnIdentifiers (columnRef : ColumnIdentifierRef, columnIdentifiers : ColumnIdentifier[]) {
    for (let columnIdentifier of columnIdentifiers) {
        assertHasColumnIdentifier(columnRef, columnIdentifier);
    }
}