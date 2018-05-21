export type ReplaceValue<T, K extends keyof T, V> = {
    [key in keyof T] : (
        key extends K ?
            V :
            T[key]
    );
};
