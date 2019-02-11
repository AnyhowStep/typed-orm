import {Omit} from "./type";

export namespace UnsafeUtil {
    export function eraseUsedRef<T extends { usedRef : {} }> (t : T) : (
        Omit<T, "usedRef"> &
        {
            usedRef : {}
        }
    ) {
        const result = {...t};
        result.usedRef = {};
        return result;
    }
}