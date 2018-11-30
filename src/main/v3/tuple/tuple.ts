export type NonEmptyTuple<T> = (T[] & { "0" : T });
export type EmptyTuple<T> = (T[] & { length : 0 });

export type Tuple<T> = (
    NonEmptyTuple<T> |
    EmptyTuple<T>
);
