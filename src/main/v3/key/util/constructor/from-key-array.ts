import {Key} from "../../key";

export type FromKeyArray<ArrT extends Key[]> = (
    ArrT[number]
);