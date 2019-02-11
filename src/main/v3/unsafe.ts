import {Omit} from "./type";

export namespace UnsafeUtil {
    //Used to make compile-times faster but removes compile-time type safety!
    export function eraseUsedRef<T extends { usedRef : {} }> (t : T) : (
        Omit<T, "usedRef"> &
        {
            usedRef : {}
        }
    ) {
        return t as any;
    }
}