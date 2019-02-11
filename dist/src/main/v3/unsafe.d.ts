import { Omit } from "./type";
export declare namespace UnsafeUtil {
    function eraseUsedRef<T extends {
        usedRef: {};
    }>(t: T): (Omit<T, "usedRef"> & {
        usedRef: {};
    });
}
