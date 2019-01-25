import { IJoin } from "../../../join";
import { FromJoin } from "./from-join";
export declare type FromJoinArray<JoinsT extends IJoin[]> = (FromJoin<JoinsT[number]>);
