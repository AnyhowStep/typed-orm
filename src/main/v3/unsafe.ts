export namespace UnsafeUtil {
    //Used to make compile-times faster but removes compile-time type safety!
    //Makes it unsafe because `usedRef` become empty objects!
    export function unsafeSelectItem<T extends { usedRef : {} }> (t : T) : ({
        [k in Exclude<keyof T, "sort"|"asc"|"desc"|"as">] : (
            k extends "usedRef" ?
            {} :
            T[k]
        )
    }) {
        return t as any;
    }
}