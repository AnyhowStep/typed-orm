import {IColumn} from "../../column";
import {ColumnMap, ColumnMapUtil} from "../../../column-map";
import * as Ctor from "../constructor";
import {IJoin} from "../../../join";

export type FromColumnMap<ColumnMapT extends ColumnMap> = (
    Ctor.FromColumnMap<ColumnMapT>[]
)
export function fromColumnMap<ColumnMapT extends ColumnMap> (
    columnMap : ColumnMapT
) : FromColumnMap<ColumnMapT> {
    return Object.keys(columnMap).map(
        columnName => columnMap[columnName]
    ) as FromColumnMap<ColumnMapT>;
}
export type FromJoin<JoinT extends IJoin> = (
    Ctor.FromJoin<JoinT>[]
);
export function fromJoin<JoinT extends IJoin> (join : JoinT) : FromJoin<JoinT> {
    return fromColumnMap(
        ColumnMapUtil.fromJoin(join)
    ) as IColumn[] as FromJoin<JoinT>;
}
export type FromJoinArray<JoinsT extends IJoin[]> = (
    Ctor.FromJoinArray<JoinsT>[]
);
export function fromJoinArray<JoinsT extends IJoin[]> (joins : JoinsT) : FromJoinArray<JoinsT> {
    const result : IColumn[] = [];
    for (let join of joins) {
        result.push(...fromJoin(join));
    }
    return result as FromJoinArray<JoinsT>;
}