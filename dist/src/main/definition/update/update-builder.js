"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Database_1 = require("../Database");
const type_util_1 = require("@anyhowstep/type-util");
const expr_operation_1 = require("../expr-operation");
const StringBuilder_1 = require("../StringBuilder");
//import {Column} from "../column";
class UpdateBuilder {
    constructor(data, db) {
        this.assignmentArr = undefined;
        this.data = data;
        this.db = db;
    }
    ignoreErrors(ignoreErrors = true) {
        return new UpdateBuilder(type_util_1.spread(this.data, {
            ignoreErrors: ignoreErrors
        }), this.db);
    }
    set(assignmentsCallback) {
        const columnReferences = this.data.selectBuilder.data.columnReferences;
        const assignments = assignmentsCallback(columnReferences, this.data.selectBuilder);
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
        return new UpdateBuilder(type_util_1.spread(this.data, {
            assignments: assignments,
        }), this.db);
    }
    getAssignments() {
        if (this.data.assignments == undefined) {
            throw new Error(`Call set() first`);
        }
        return this.data.assignments;
    }
    getAssignmentArr() {
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
                        column: Database_1.Database.EscapeId(table) + "." + Database_1.Database.EscapeId(column),
                        rawValue: assignments[table][column],
                    });
                }
            }
        }
        return this.assignmentArr;
    }
    querify(sb) {
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
                sb.append(expr_operation_1.querify(assignment.rawValue));
            }, ",\n");
        });
        this.data.selectBuilder.querifyWhere(sb);
    }
    getQuery() {
        const sb = new StringBuilder_1.StringBuilder();
        this.querify(sb);
        return sb.toString();
    }
    execute() {
        return new Promise((resolve, reject) => {
            if (this.getAssignmentArr().length == 0) {
                resolve({
                    fieldCount: 0,
                    affectedRows: -1,
                    insertId: 0,
                    serverStatus: 0,
                    warningCount: 1,
                    message: "SET clause is empty; no updates occurred",
                    protocol41: false,
                    changedRows: 0,
                });
                return;
            }
            this.db.rawQuery(this.getQuery(), undefined, (err, result, _fields) => {
                if (err == undefined) {
                    if (result == undefined) {
                        reject(new Error(`Expected a result`));
                    }
                    else {
                        resolve(result);
                    }
                }
                else {
                    reject(err);
                }
            });
        });
    }
    ;
}
exports.UpdateBuilder = UpdateBuilder;
//# sourceMappingURL=update-builder.js.map