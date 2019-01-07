import {IColumn} from "../../../column";
import {ColumnMapUtil} from "../../../../column-map";
import * as Ctor from "../../constructor";
import {IJoin} from "../../../../join";
import {fromColumnMap} from "./from-column-map";

export type FromJoin<JoinT extends IJoin> = (
    Ctor.FromJoin<JoinT>[]
);
export function fromJoin<JoinT extends IJoin> (join : JoinT) : FromJoin<JoinT> {
    return fromColumnMap(
        ColumnMapUtil.fromJoin(join)
    ) as IColumn[] as FromJoin<JoinT>;
}