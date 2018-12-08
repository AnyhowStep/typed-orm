export declare type ExtractEqual<A, B> = (A extends B ? Extract<B, A> : never);
export declare type ToUnknownIfAllFieldsNever<T> = (T[keyof T] extends never ? unknown : T[keyof T]);
export declare type Writable<T> = {
    -readonly [k in keyof T]: T[k];
};
export declare function isObjectWithKeys<T>(raw: any, keys: Extract<keyof T, string>[]): raw is {
    [k in Extract<keyof T, string>]: any;
};
//# sourceMappingURL=type.d.ts.map