import { IQuery } from "../../../query";
import { IJoin } from "../../../join";
import { FromJoinArray } from "./from-join-array";
export declare type FromQueryJoins<QueryT extends IQuery> = ((QueryT["_joins"] extends IJoin[] ? FromJoinArray<QueryT["_joins"]> : never) | (QueryT["_parentJoins"] extends IJoin[] ? FromJoinArray<QueryT["_parentJoins"]> : never));
