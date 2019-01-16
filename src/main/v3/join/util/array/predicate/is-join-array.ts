import {IJoin} from "../../../join";
import * as predicate from "../../predicate";

export function isJoinArray (raw : any) : raw is IJoin[] {
    if (!(raw instanceof Array)) {
        return false;
    }
    for (let item of raw) {
        if (!predicate.isJoin(item)) {
            return false;
        }
    }
    return true;
}