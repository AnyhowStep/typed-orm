import * as d from "../../declaration";
import { Database } from "../Database";
export declare class UpdateBuilder<DataT extends d.AnyUpdateBuilderData> implements d.IUpdateBuilder<DataT> {
    readonly data: DataT;
    readonly db: Database;
    constructor(data: DataT, db: Database);
    ignoreErrors(ignoreErrors?: boolean): any;
    set<AssignmentsCallbackT extends d.AssignmentsCallback<DataT>>(assignmentsCallback: AssignmentsCallbackT): d.IUpdateBuilder<{
        selectBuilder: DataT["selectBuilder"];
        ignoreErrors: DataT["ignoreErrors"];
        assignments: ReturnType<AssignmentsCallbackT>;
    }>;
    private getAssignments;
    private assignmentArr;
    private getAssignmentArr;
    querify(sb: d.IStringBuilder): void;
    getQuery(): string;
    execute(this: UpdateBuilder<{
        selectBuilder: any;
        ignoreErrors: any;
        assignments: {
            [table: string]: {
                [name: string]: d.RawExpr<any>;
            };
        };
    }>): any;
}
