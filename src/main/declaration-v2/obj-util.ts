export type ReplaceValue<T, K extends keyof T, V> = {
    [key in keyof T] : (
        key extends K ?
            V :
            T[key]
    );
};
export type ReplaceValue2<
    T,
    K0 extends keyof T, V0,
    K1 extends keyof T, V1
> = {
    [key in keyof T] : (
        key extends K0 ?
        V0 :
        key extends K1 ?
        V1 :
        T[key]
    );
};
