import { ColumnIdentifier, ColumnIdentifierUtil } from "./column-identifier";
import { ColumnMap } from "./column-map";
export interface ColumnIdentifierMap {
    readonly [columnName: string]: ColumnIdentifier;
}
export declare namespace ColumnIdentifierMapUtil {
    type FromColumnMap<ColumnMapT extends ColumnMap> = ({
        readonly [columnName in Extract<keyof ColumnMapT, string>]: (ColumnIdentifierUtil.FromColumn<ColumnMapT[columnName]>);
    });
    type IsSubset<A extends ColumnIdentifierMap, B extends ColumnIdentifierMap> = (string extends Extract<keyof A, string> ? boolean : string extends Extract<keyof B, string> ? boolean : Extract<keyof A, string> extends Extract<keyof B, string> ? ({
        [columnName in Extract<keyof A, string>]: (ColumnIdentifierUtil.IsEqual<A[columnName], B[columnName]>);
    }[Extract<keyof A, string>]) : false);
    function isSubset<A extends ColumnIdentifierMap, B extends ColumnIdentifierMap>(a: A, b: B): IsSubset<A, B>;
    function assertIsSubset(a: ColumnIdentifierMap, b: ColumnIdentifierMap): void;
}
//# sourceMappingURL=column-identifier-map.d.ts.map