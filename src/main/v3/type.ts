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
//TODO Better name or sth
export type ToUnknownIfAllFieldsNever<T> = (
    T[keyof T] extends never ?
    unknown :
    T[keyof T]
);