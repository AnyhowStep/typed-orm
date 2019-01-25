import * as Ctor from "../../constructor";
import { IJoin } from "../../../../join";
export declare function fromJoin<JoinT extends IJoin>(join: JoinT): Ctor.FromJoin<JoinT>[];
