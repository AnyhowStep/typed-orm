export declare type ExtractEqual<A, B> = (A extends B ? Extract<B, A> : never);
export declare type ToUnknownIfAllFieldsNever<T> = (T[keyof T] extends never ? unknown : T[keyof T]);
export declare type Writable<T> = {
    -readonly [k in keyof T]: T[k];
};
//# sourceMappingURL=type.d.ts.map