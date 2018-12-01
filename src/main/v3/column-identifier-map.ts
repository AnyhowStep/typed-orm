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