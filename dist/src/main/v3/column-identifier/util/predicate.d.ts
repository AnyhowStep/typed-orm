import { ColumnIdentifier } from "../column-identifier";
export declare type IsEqual<A extends ColumnIdentifier, B extends ColumnIdentifier> = (string extends A["tableAlias"] ? boolean : string extends B["tableAlias"] ? boolean : A["tableAlias"] extends B["tableAlias"] ? (string extends A["name"] ? boolean : string extends B["name"] ? boolean : A["name"] extends B["name"] ? true : false) : false);
export declare function isEqual<A extends ColumnIdentifier, B extends ColumnIdentifier>(a: A, b: B): IsEqual<A, B>;
export declare function assertIsEqual(a: ColumnIdentifier, b: ColumnIdentifier): void;
export declare function isColumnIdentifier(raw: any): raw is ColumnIdentifier;
//# sourceMappingURL=predicate.d.ts.map