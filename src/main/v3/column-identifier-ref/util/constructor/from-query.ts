import {SelectItem} from "../../../select-item";
import {IJoin} from "../../../join";
import {IQuery} from "../../../query";
import {ColumnIdentifierRef} from "../../column-identifier-ref";
import {FromJoinArray, appendJoinArray} from "./from-join-array";
import {FromSelectItemArray, appendSelectItemArray} from "./from-select-item-array";

export type FromQuery<QueryT extends IQuery> = (
    (
        QueryT["_joins"] extends IJoin[] ?
        FromJoinArray<QueryT["_joins"]> :
        {}
    ) &
    (
        QueryT["_parentJoins"] extends IJoin[] ?
        FromJoinArray<QueryT["_parentJoins"]> :
        {}
    ) &
    (
        QueryT["_selects"] extends SelectItem[] ?
        FromSelectItemArray<QueryT["_selects"]> :
        {}
    )
);
export function fromQuery<QueryT extends IQuery> (
    query : QueryT
) : FromQuery<QueryT> {
    const result : ColumnIdentifierRef = {};
    if (query._joins != undefined) {
        appendJoinArray(result, query._joins);
    }
    if (query._parentJoins != undefined) {
        appendJoinArray(result, query._parentJoins);
    }
    if (query._selects != undefined) {
        appendSelectItemArray(result, query._selects);
    }
    return result as FromQuery<QueryT>;
}