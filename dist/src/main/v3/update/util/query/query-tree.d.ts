import { IUpdate, UpdateModifier, Assignment } from "../../update";
import { UpdatableQuery } from "../constructor";
import { QueryTreeArray } from "../../../query-tree";
export declare function queryTree_Assignments(assignments: Assignment[]): QueryTreeArray;
export declare type ExecutableUpdate = IUpdate<{
    readonly _query: UpdatableQuery;
    readonly _assignments: Assignment[];
    readonly _modifier: UpdateModifier | undefined;
}>;
export declare function queryTree(update: ExecutableUpdate): QueryTreeArray;
//# sourceMappingURL=query-tree.d.ts.map