import {ColumnIdentifierMap} from "../column-identifier-map";
import {ColumnIdentifier, ColumnIdentifierUtil} from "../../column-identifier";

export type IsSubset<
    A extends ColumnIdentifierMap,
    B extends ColumnIdentifierMap
> = (
    string extends Extract<keyof A, string> ?
    boolean :
    string extends Extract<keyof B, string> ?
    boolean :
    Extract<keyof A, string> extends Extract<keyof B, string> ?
    (
        {
            [columnName in Extract<keyof A, string>] : (
                ColumnIdentifierUtil.IsEqual<
                    A[columnName],
                    B[columnName]
                >
            )
        }[Extract<keyof A, string>]
    ) :
    false
);
export function isSubset<
    A extends ColumnIdentifierMap,
    B extends ColumnIdentifierMap
> (a : A, b : B) : IsSubset<A, B> {
    for (let columnNameA in a) {
        const columnA = a[columnNameA];
        const columnB = b[columnNameA];

        if (columnB == undefined) {
            return false as any;
        }

        if (!ColumnIdentifierUtil.isEqual(columnA, columnB)) {
            return false as any;
        }
    }
    return true as any;
}

export function assertIsSubset (a : ColumnIdentifierMap, b : ColumnIdentifierMap) {
    for (let columnNameA in a) {
        const columnA = a[columnNameA];
        const columnB = b[columnNameA];

        if (columnB == undefined) {
            throw new Error(`Column ${columnNameA} is not allowed`);
        }

        ColumnIdentifierUtil.assertIsEqual(columnA, columnB);
    }
}

//Only checks column.name, not column.tableAlias
export function assertIsColumnNameSubset (a : ColumnIdentifierMap, b : ColumnIdentifierMap) {
    for (let columnNameA in a) {
        const columnB = b[columnNameA];

        if (columnB == undefined) {
            throw new Error(`Column ${columnNameA} is not allowed`);
        }
    }
}

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