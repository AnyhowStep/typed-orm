import { ColumnIdentifier } from "../../column-identifier";
import { IsEqual } from "../predicate";
export declare function isColumnIdentifierArray(raw: any): raw is ColumnIdentifier[];
export declare type HasColumnIdentifier<ArrT extends ColumnIdentifier[], ColumnIdentifierT extends ColumnIdentifier> = (ArrT[number] extends never ? false : IsEqual<ArrT[number], ColumnIdentifierT>);
export declare function hasColumnIdentifier<ArrT extends ColumnIdentifier[], ColumnIdentifierT extends ColumnIdentifier>(arr: ArrT, columnIdentifier: ColumnIdentifierT): HasColumnIdentifier<ArrT, ColumnIdentifierT>;
export declare function assertNoOverlap(arrA: ColumnIdentifier[], arrB: ColumnIdentifier[]): void;
export declare function assertNoDuplicate(arr: ColumnIdentifier[]): void;
//# sourceMappingURL=predicate.d.ts.map