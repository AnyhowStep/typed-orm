export declare type ExtractEqual<A, B> = (A extends B ? Extract<B, A> : never);
export declare type ToUnknownIfAllFieldsNever<T> = (T[keyof T] extends never ? unknown : T[keyof T]);
export declare type Writable<T> = {
    -readonly [k in keyof T]: Writable<T[k]>;
};
export declare function isObjectWithKeys<T>(raw: any, keys: Extract<keyof T, string>[]): raw is {
    [k in Extract<keyof T, string>]: any;
};
export declare type MAX_SAFE_INTEGER = 9007199254740991;
export declare const MAX_SAFE_INTEGER: MAX_SAFE_INTEGER;
export declare type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export declare function isStringArray(raw: any): raw is string[];
export declare type PromiseResult<P extends Promise<any>> = (P extends Promise<infer R> ? R : never);
export declare function lazyInit<K extends string, T>(key: K, instantiate: () => T): {
    [k in K]: T;
};
