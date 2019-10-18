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
export declare type UnionToIntersection<U> = ((U extends any ? (k: U) => void : never) extends ((k: infer I) => void) ? I : never);
export declare type IsStrictSameType<A1 extends any, A2 extends any> = (<A>() => A extends A1 ? true : false) extends (<A>() => A extends A2 ? true : false) ? true : false;
export declare type ExtractStrictSameType<A1, A2> = A1 extends any ? (IsStrictSameType<A1, A2> extends true ? A1 : never) : never;
/**
 * https://github.com/microsoft/TypeScript/issues/32707#issuecomment-521819804
 *
 * @todo Support both `A1` and `A2` being union types
 * At the moment, it only works right if `A2` is not a union
 */
export declare type TryReuseExistingType<A1, A2> = ExtractStrictSameType<A1, A2> extends never ? A2 : ExtractStrictSameType<A1, A2>;
