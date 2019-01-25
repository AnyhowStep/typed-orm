import * as Ctor from "../../constructor";
import { IJoin } from "../../../../join";
export declare function fromJoinArray<JoinsT extends IJoin[]>(joins: JoinsT): Ctor.FromJoinArray<JoinsT>[];
