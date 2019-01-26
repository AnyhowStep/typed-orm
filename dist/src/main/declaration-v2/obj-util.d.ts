export declare type RemoveKey<T, K extends keyof T> = {
    [key in Exclude<keyof T, K>]: T[key];
};
export declare type ReplaceValue<T, K extends keyof T, V> = {
    [key in keyof T]: (key extends K ? V : T[key]);
};
export declare type ReplaceValue2<T, K0 extends keyof T, V0, K1 extends keyof T, V1> = {
    [key in keyof T]: (key extends K0 ? V0 : key extends K1 ? V1 : T[key]);
};
export declare type ReplaceValue3<T, K0 extends keyof T, V0, K1 extends keyof T, V1, K2 extends keyof T, V2> = {
    [key in keyof T]: (key extends K0 ? V0 : key extends K1 ? V1 : key extends K2 ? V2 : T[key]);
};
export declare type ReplaceValue4<T, K0 extends keyof T, V0, K1 extends keyof T, V1, K2 extends keyof T, V2, K3 extends keyof T, V3> = {
    [key in keyof T]: (key extends K0 ? V0 : key extends K1 ? V1 : key extends K2 ? V2 : key extends K3 ? V3 : T[key]);
};
export declare type ReadonlyRemoveKey<T, K extends keyof T> = {
    readonly [key in Exclude<keyof T, K>]: T[key];
};
export declare type ReadonlyReplaceValue<T, K extends keyof T, V> = {
    readonly [key in keyof T]: (key extends K ? V : T[key]);
};
export declare type ReadonlyReplaceValue2<T, K0 extends keyof T, V0, K1 extends keyof T, V1> = {
    readonly [key in keyof T]: (key extends K0 ? V0 : key extends K1 ? V1 : T[key]);
};
export declare type ReadonlyReplaceValue3<T, K0 extends keyof T, V0, K1 extends keyof T, V1, K2 extends keyof T, V2> = {
    readonly [key in keyof T]: (key extends K0 ? V0 : key extends K1 ? V1 : key extends K2 ? V2 : T[key]);
};
export declare type ReadonlyReplaceValue4<T, K0 extends keyof T, V0, K1 extends keyof T, V1, K2 extends keyof T, V2, K3 extends keyof T, V3> = {
    readonly [key in keyof T]: (key extends K0 ? V0 : key extends K1 ? V1 : key extends K2 ? V2 : key extends K3 ? V3 : T[key]);
};
//# sourceMappingURL=obj-util.d.ts.map