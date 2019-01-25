import { ToNullable } from "../operation";
import { IJoin } from "../../../join";
export declare type FromJoin<JoinT extends IJoin> = (JoinT extends IJoin ? (true extends JoinT["nullable"] ? ToNullable<JoinT["columns"]> : JoinT["columns"]) : never);
export declare function fromJoin<JoinT extends IJoin>(join: JoinT): FromJoin<JoinT>;
