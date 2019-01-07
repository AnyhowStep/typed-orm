import {CandidateKey} from "../../../candidate-key";
import {ExtractSuperKey} from "../../query";

export type FindSuperKey<
    ArrT extends CandidateKey[],
    KeyT extends CandidateKey
> = (
    ExtractSuperKey<
        ArrT[number],
        KeyT
    >
);