import {IUpdate, UpdateModifier, Assignment, UpdatableQuery} from "../../update";
import {QueryTreeArray} from "../../../query-tree";
import {QueryUtil} from "../../../query";
import {escapeId} from "sqlstring";
import {RawExprUtil} from "../../../raw-expr";

export function queryTree_Assignments (assignments : Assignment[]) : QueryTreeArray {
    if (assignments.length == 0) {
        throw new Error(`No assignments found`);
    }
    const result : QueryTreeArray = [];

    for (let assignment of assignments) {
        if (result.length > 0) {
            result.push(",");
        }
        result.push(escapeId(assignment.tableAlias));
        result.push(".");
        result.push(escapeId(assignment.columnName));
        result.push("=");
        result.push(RawExprUtil.queryTree(assignment.value));
    }

    return result;
}

export type ExecutableUpdate = IUpdate<{
    readonly _query : UpdatableQuery,
    readonly _assignments : Assignment[],
    readonly _modifier : UpdateModifier|undefined,
}>;
export function queryTree (update : ExecutableUpdate) : QueryTreeArray {
    const result : QueryTreeArray = [];

    result.push("UPDATE");

    if (update._modifier == UpdateModifier.IGNORE) {
        result.push("IGNORE");
    }

    result.push(QueryUtil.queryTreeJoins(update._query));

    result.push("SET");
    result.push(queryTree_Assignments(update._assignments));

    result.push(QueryUtil.queryTreeWhere(update._query));

    return result;
}