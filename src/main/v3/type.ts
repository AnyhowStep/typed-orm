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
//TODO-DEBATE Better name or sth
export type ToUnknownIfAllFieldsNever<T> = (
    T[keyof T] extends never ?
    unknown :
    T[keyof T]
);
//TODO-DEBATE Better name or sth
export type ToNeverIfAllFieldsNever<T> = (
    T[keyof T] extends never ?
    never :
    T[keyof T]
);
export type Writable<T> = {
    -readonly [k in keyof T] : Writable<T[k]>
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

export type MAX_SAFE_INTEGER = 9007199254740991;
export const MAX_SAFE_INTEGER : MAX_SAFE_INTEGER = 9007199254740991;

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

export function isStringArray (raw : any) : raw is string[] {
    if (!(raw instanceof Array)) {
        return false;
    }
    for (let item of raw) {
        if (typeof item != "string") {
            return false;
        }
    }
    return true;
}

export type PromiseResult<P extends Promise<any>> = (
    P extends Promise<infer R> ?
    R :
    never
);

/*
    Getters are a good way to pretend that a function is a read-only variable.
    They also help with resolving circular imports during run-time.
*/
export function lazyInit<K extends string, T> (
    key : K,
    instantiate : () => T
) : { [k in K] : T } {
    let value : T|undefined = undefined;

    const result = {
        get [key] () : T {
            if (value == undefined) {
                value = instantiate();
            }
            return value;
        }
    };
    return result as any;
}