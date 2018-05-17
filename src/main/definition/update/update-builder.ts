import * as d from "../../declaration";
import {Database} from "../Database";
import {spread} from "@anyhowstep/type-util";
import {querify} from "../expr-operation";
import {StringBuilder} from "../StringBuilder";
//import {Column} from "../column";

export class UpdateBuilder<DataT extends d.AnyUpdateBuilderData> implements d.IUpdateBuilder<DataT> {
    readonly data : DataT;
    readonly db : Database;

    public constructor (data : DataT, db : Database) {
        this.data = data;
        this.db = db;
    }

    ignoreErrors (ignoreErrors : boolean=true) {
        return new UpdateBuilder(
            spread(
                this.data,
                {
                    ignoreErrors : ignoreErrors
                }
            ),
            this.db
        ) as any;
    }

    set<
        AssignmentsCallbackT extends d.AssignmentsCallback<DataT>
    > (
        assignmentsCallback : AssignmentsCallbackT
    ) {
        const columnReferences = this.data.selectBuilder.data.columnReferences;
        const assignments = assignmentsCallback(
            columnReferences,
            this.data.selectBuilder
        );

        for (let table in assignments) {
            const columns = assignments[table];
            if (columns == undefined) {
                continue;
            }
            if (!columnReferences.hasOwnProperty(table)) {
                throw new Error(`Unexpected table ${table}; it does not exist in FROM or JOIN clause`);
            }

            for (let column in columns) {
                const assignment = columns[column];
                if (assignment == undefined) {
                    continue;
                }
                if (!columnReferences[table].hasOwnProperty(column)) {
                    throw new Error(`Unexpected table ${table}; does not have column ${column}`);
                }

                //If we specify a value, it better match our assertion
                if (!(assignment instanceof Object) || (assignment instanceof Date)) {
                    columns[column] = columnReferences[table][column].assertDelegate("name", assignment);
                }
            }
        }

        return new UpdateBuilder(spread(
            this.data,
            {
                assignments : assignments,
            }
        ), this.db) as any;
    }

    private getAssignments () {
        if (this.data.assignments == undefined) {
            throw new Error(`Call set() first`);
        }
        return this.data.assignments;
    }

    private assignmentArr : undefined|({
        column : string,
        rawValue : any,
    })[] = undefined;
    private getAssignmentArr () {
        const assignments = this.getAssignments();

        if (this.assignmentArr == undefined) {
            this.assignmentArr = [];

            for (let table in assignments) {
                if (!assignments.hasOwnProperty(table) || assignments[table] == undefined) {
                    continue;
                }
                for (let column in assignments[table]) {
                    if (!assignments[table].hasOwnProperty(column) || assignments[table][column] == undefined) {
                        continue;
                    }
                    this.assignmentArr.push({
                        column : Database.EscapeId(table) + "." + Database.EscapeId(column),
                        rawValue : assignments[table][column],
                    });
                }
            }
        }
        return this.assignmentArr;
    }


    querify (sb : d.IStringBuilder) {
        sb.append("UPDATE");
        if (this.data.ignoreErrors) {
            sb.append(" IGNORE");
        }
        sb.appendLine();
        this.data.selectBuilder.querifyColumnReferences(sb);
        //this.data.selectBuilder.querify or something
        sb.appendLine("SET");
        sb.scope((sb) => {
            sb.map(this.getAssignmentArr(), (sb, assignment) => {
                sb.append(assignment.column);
                sb.append(" = ");
                sb.append(querify(assignment.rawValue));
            }, ",\n");
        });
        this.data.selectBuilder.querifyWhere(sb);
    }

    getQuery () {
        const sb = new StringBuilder();
        this.querify(sb);
        return sb.toString();
    }

    execute () {
        return new Promise((resolve, reject) => {
            if (this.getAssignmentArr().length == 0) {
                resolve ({
                    fieldCount   : 0,
                    affectedRows : -1, //-1 because we don't know
                    insertId     : 0,
                    serverStatus : 0,
                    warningCount : 1,
                    message      : "SET clause is empty; no updates occurred",
                    protocol41   : false,
                    changedRows  : 0,
                });
                return;
            }
            this.db.rawQuery(
                this.getQuery(),
                undefined,
                (err, result, _fields) => {
                    if (err == undefined) {
                        if (result == undefined) {
                            reject(new Error(`Expected a result`))
                        } else {
                            resolve(result);
                        }
                    } else {
                        reject(err);
                    }
                }
            );
        }) as any;
    };
}
