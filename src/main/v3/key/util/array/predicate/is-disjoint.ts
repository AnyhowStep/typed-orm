import {Key} from "../../../key";
import {isEqual} from "../../predicate";

export function isDisjoint (
    arrayA : Key[],
    arrayB : Key[]
) : boolean {
    for (let a of arrayA) {
        for (let b of arrayB) {
            if (isEqual(a, b)) {
                return false;
            }
        }
    }
    return true;
}
