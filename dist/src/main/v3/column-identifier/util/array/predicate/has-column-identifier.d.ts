import { ColumnIdentifier } from "../../../column-identifier";
import { IsEqual } from "../../predicate";
export declare type HasColumnIdentifier<ArrT extends ColumnIdentifier[], ColumnIdentifierT extends ColumnIdentifier> = (ArrT[number] extends never ? false : IsEqual<ArrT[number], ColumnIdentifierT>);
export declare function hasColumnIdentifier<ArrT extends ColumnIdentifier[], ColumnIdentifierT extends ColumnIdentifier>(arr: ArrT, columnIdentifier: ColumnIdentifierT): HasColumnIdentifier<ArrT, ColumnIdentifierT>;
