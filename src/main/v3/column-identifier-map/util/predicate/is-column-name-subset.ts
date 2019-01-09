import {ColumnIdentifierMap} from "../../column-identifier-map";

//Only checks column.name, not column.tableAlias
export function assertIsColumnNameSubset (a : ColumnIdentifierMap, b : ColumnIdentifierMap) {
    for (let columnNameA in a) {
        const columnB = b[columnNameA];

        if (columnB == undefined) {
            throw new Error(`Column ${columnNameA} is not allowed`);
        }
    }
}