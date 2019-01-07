import {IColumn} from "../../../column";
import {ColumnMapUtil} from "../../../../column-map";
import * as Ctor from "../../constructor";
import {IJoin} from "../../../../join";
import {fromColumnMap} from "./from-column-map";

export function fromJoin<JoinT extends IJoin> (
    join : JoinT
) : Ctor.FromJoin<JoinT>[] {
    return fromColumnMap(
        ColumnMapUtil.fromJoin(join)
    ) as IColumn[] as Ctor.FromJoin<JoinT>[];
}