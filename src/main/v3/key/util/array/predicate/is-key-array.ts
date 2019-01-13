import {Key} from "../../../key";
import {isKey} from "../../predicate";

export function isKeyArray (raw : any) : raw is Key[] {
    if (!(raw instanceof Array)) {
        return false;
    }
    for (let item of raw) {
        if (!isKey(item)) {
            return false;
        }
    }
    return true;
}