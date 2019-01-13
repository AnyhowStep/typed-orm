import {Key} from "../../key";

export type ExtractSubKey<
    A extends Key,
    B extends Key
> = (
    A extends Key ?
    (
        B extends Key ?
        (
            A[number] extends B[number] ?
            A :
            never
        ) :
        never
    ) :
    never
);