import {ColumnIdentifier} from "../../../column-identifier";
import {IsEqual, isEqual} from "../../predicate";

export type HasColumnIdentifier<
    ArrT extends ColumnIdentifier[],
    ColumnIdentifierT extends ColumnIdentifier
> = (
    ArrT[number] extends never ?
    false :
    IsEqual<
        ArrT[number],
        ColumnIdentifierT
    >
);
export function hasColumnIdentifier<
    ArrT extends ColumnIdentifier[],
    ColumnIdentifierT extends ColumnIdentifier
> (
    arr : ArrT,
    columnIdentifier : ColumnIdentifierT
) : HasColumnIdentifier<ArrT, ColumnIdentifierT> {
    for (let item of arr) {
        if (isEqual(item, columnIdentifier)) {
            return true as HasColumnIdentifier<ArrT, ColumnIdentifierT>;
        }
    }
    return false as HasColumnIdentifier<ArrT, ColumnIdentifierT>;
}