import { ColumnIdentifierMap } from "../../column-identifier-map";
import { ColumnIdentifierUtil } from "../../../column-identifier";
export declare type IsSubset<A extends ColumnIdentifierMap, B extends ColumnIdentifierMap> = (string extends Extract<keyof A, string> ? boolean : string extends Extract<keyof B, string> ? boolean : Extract<keyof A, string> extends Extract<keyof B, string> ? ({
    [columnName in Extract<keyof A, string>]: (ColumnIdentifierUtil.IsEqual<A[columnName], B[columnName]>);
}[Extract<keyof A, string>]) : false);
export declare function isSubset<A extends ColumnIdentifierMap, B extends ColumnIdentifierMap>(a: A, b: B): IsSubset<A, B>;
export declare function assertIsSubset(a: ColumnIdentifierMap, b: ColumnIdentifierMap): void;
//# sourceMappingURL=is-subset.d.ts.map