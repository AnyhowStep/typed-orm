export declare namespace UnsafeUtil {
    function unsafeSelectItem<T extends {
        usedRef: {};
    }>(t: T): ({
        [k in Exclude<keyof T, "sort" | "asc" | "desc" | "as">]: (k extends "usedRef" ? {} : T[k]);
    });
}
