import  {ColumnIdentifier, ColumnIdentifierUtil} from "./column-identifier";
import  {ColumnMap} from "./column-map";

export interface ColumnIdentifierMap {
    readonly [columnName : string] : ColumnIdentifier
};

export namespace ColumnIdentifierMapUtil {
    export type FromColumnMap<ColumnMapT extends ColumnMap> = (
        {
            readonly [columnName in Extract<keyof ColumnMapT, string>] : (
                ColumnIdentifierUtil.FromColumn<ColumnMapT[columnName]>
            )
        }
    );

    /*
        Cannot actually check `assertDelegate` are equal.
        TODO Refactor this to ColumnIdentifierMap.assertIsEqual()
    */
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
}