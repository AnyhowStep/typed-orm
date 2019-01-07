import {CandidateKey} from "../../../candidate-key";
import {ExtractSubKey} from "../../query";

export type FindSubKey<
    ArrT extends CandidateKey[],
    KeyT extends CandidateKey
> = (
    ExtractSubKey<
        ArrT[number],
        KeyT
    >
);