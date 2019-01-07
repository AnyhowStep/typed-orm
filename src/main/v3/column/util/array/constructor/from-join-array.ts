import {IColumn} from "../../../column";
import * as Ctor from "../../constructor";
import {IJoin} from "../../../../join";
import {fromJoin} from "./from-join";

export function fromJoinArray<JoinsT extends IJoin[]> (
    joins : JoinsT
) : Ctor.FromJoinArray<JoinsT>[] {
    const result : IColumn[] = [];
    for (let join of joins) {
        result.push(...fromJoin(join));
    }
    return result as Ctor.FromJoinArray<JoinsT>[];
}