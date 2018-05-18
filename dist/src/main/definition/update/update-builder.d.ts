import * as d from "../../declaration";
import { Database } from "../Database";
import { ConnectedDatabase } from "../ConnectedDatabase";
export declare class UpdateBuilder<DataT extends d.AnyUpdateBuilderData> implements d.IUpdateBuilder<DataT> {
    readonly data: DataT;
    readonly db: Database | ConnectedDatabase;
    constructor(data: DataT, db: Database | ConnectedDatabase);
    ignoreErrors(ignoreErrors?: boolean): any;
    set<AssignmentsCallbackT extends d.AssignmentsCallback<DataT>>(assignmentsCallback: AssignmentsCallbackT): any;
    private getAssignments;
    private assignmentArr;
    private getAssignmentArr;
    querify(sb: d.IStringBuilder): void;
    getQuery(): string;
    execute(): any;
}
