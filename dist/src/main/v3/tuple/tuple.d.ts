export declare type NonEmptyTuple<T> = (T[] & {
    "0": T;
});
export declare type EmptyTuple<T> = (T[] & {
    length: 0;
});
export declare type Tuple<T> = (NonEmptyTuple<T> | EmptyTuple<T>);
