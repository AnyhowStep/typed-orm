export type ExtractEqual<A, B> = (
    A extends B ?
    Extract<B, A> :
    never
);
/*
type a = ExtractEqual<number|string, string|boolean>;
type b = ExtractEqual<3|2|1, 1|2>;
//This doesn't work because number|1 is just number
type c = ExtractEqual<number|1, 1|2>;
//*/
//TODO Better name or sth
export type ToUnknownIfAllFieldsNever<T> = (
    T[keyof T] extends never ?
    unknown :
    T[keyof T]
);
export type Writable<T> = {
    -readonly [k in keyof T] : T[k]
};

export function isObjectWithKeys<T> (
    raw : any,
    keys : Extract<keyof T, string>[]
) : raw is {
    [k in Extract<keyof T, string>] : any
} {
    if (raw == undefined) {
        return false;
    }
    if (!(raw instanceof Object)) {
        return false;
    }
    for (let k of keys) {
        if (!(k in raw)) {
            return false;
        }
    }
    return true;
}