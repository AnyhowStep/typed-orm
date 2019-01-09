import {ColumnIdentifier} from "../../../column-identifier";
import {isEqual} from "../../predicate";

export function assertDisjoint (
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