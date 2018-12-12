import {ColumnIdentifier} from "../../column-identifier";
import {isColumnIdentifier, IsEqual, isEqual} from "../predicate";

export function isColumnIdentifierArray (raw : any) : raw is ColumnIdentifier[] {
    if (!(raw instanceof Array)) {
        return false;
    }
    for (let item of raw) {
        if (!isColumnIdentifier(item)) {
            return false;
        }
    }
    return true;
}

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

export function assertNoOverlap (
    arrA : ColumnIdentifier[],
    arrB : ColumnIdentifier[]
) {
    for (let a of arrA) {
        for (let b of arrB) {
            if (isEqual(a, b)) {
                throw new Error(`Duplicate column identifier ${a.tableAlias}.${a.name} found; consider aliasing`);
            }
        }
    }
}
export function assertNoDuplicate (
    arr : ColumnIdentifier[]
) {
    for (let i=0; i<arr.length; ++i) {
        for (let j=i+1; j<arr.length; ++j) {
            if (isEqual(arr[i], arr[j])) {
                throw new Error(`Duplicate column identifier ${arr[i].tableAlias}.${arr[i].name}`);
            }
        }
    }
}