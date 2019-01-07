import {IJoin} from "../../../join";
import {FromJoin} from "./from-join";

export type FromJoinArray<JoinsT extends IJoin[]> = (
    FromJoin<JoinsT[number]>
);