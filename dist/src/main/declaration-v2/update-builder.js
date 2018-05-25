"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysql = require("typed-mysql");
const table_1 = require("./table");
const raw_expr_1 = require("./raw-expr");
const column_references_1 = require("./column-references");
const join_collection_1 = require("./join-collection");
const StringBuilder_1 = require("./StringBuilder");
class UpdateBuilder {
    constructor(selectBuilder, assignmentReferences, willIgnoreErrors, db) {
        this.selectBuilder = selectBuilder;
        this.assignmentReferences = assignmentReferences;
        this.willIgnoreErrors = willIgnoreErrors;
        this.db = db;
        this.assignmentArr = undefined;
    }
    //Ignores errors, you really should not call this
    ignoreErrors(ignoreErrors = true) {
        return new UpdateBuilder(this.selectBuilder, this.assignmentReferences, ignoreErrors, this.db);
    }
    ;
    set(delegate) {
        if (this.selectBuilder.data.joins.length == 1) {
            const columnReferences = join_collection_1.JoinCollectionUtil.toColumnReferences(this.selectBuilder.data.joins);
            const assignmentDelegate = delegate;
            const assignmentCollection = assignmentDelegate(column_references_1.ColumnReferencesUtil.toConvenient(columnReferences), this.selectBuilder);
            const assignmentReferences = {
                [this.selectBuilder.data.joins[0].table.alias]: assignmentCollection
            };
            table_1.TableUtil.validateUpdateAssignmentReferences(this.selectBuilder.data.joins, assignmentReferences);
            return new UpdateBuilder(this.selectBuilder, assignmentReferences, this.willIgnoreErrors, this.db);
        }
        else {
            const columnReferences = join_collection_1.JoinCollectionUtil.toColumnReferences(this.selectBuilder.data.joins);
            const assignmentDelegate = delegate;
            const assignmentReferences = assignmentDelegate(columnReferences, this.selectBuilder);
            table_1.TableUtil.validateUpdateAssignmentReferences(this.selectBuilder.data.joins, assignmentReferences);
            return new UpdateBuilder(this.selectBuilder, assignmentReferences, this.willIgnoreErrors, this.db);
        }
    }
    execute() {
        if (this.getAssignmentArr().length == 0) {
            return Promise.resolve({
                fieldCount: 0,
                affectedRows: -1,
                insertId: 0,
                serverStatus: 0,
                warningCount: 1,
                message: "SET clause is empty; no updates occurred",
                protocol41: false,
                changedRows: 0,
            });
        }
        return this.db.rawUpdate(this.getQuery(), {});
    }
    getAssignmentArr() {
        if (this.assignmentArr != undefined) {
            return this.assignmentArr;
        }
        const assignmentReferences = this.assignmentReferences;
        if (assignmentReferences == undefined) {
            return [];
        }
        const result = [];
        for (let tableAlias in assignmentReferences) {
            if (!assignmentReferences.hasOwnProperty(tableAlias) ||
                assignmentReferences[tableAlias] == undefined) {
                continue;
            }
            for (let columnName in assignmentReferences[tableAlias]) {
                if (!assignmentReferences[tableAlias].hasOwnProperty(columnName) ||
                    assignmentReferences[tableAlias][columnName] == undefined) {
                    continue;
                }
                result.push({
                    column: mysql.escapeId(tableAlias) + "." + mysql.escapeId(columnName),
                    rawValue: assignmentReferences[tableAlias][columnName],
                });
            }
        }
        this.assignmentArr = result;
        return result;
    }
    querify(sb) {
        sb.append("UPDATE");
        if (this.willIgnoreErrors) {
            sb.append(" IGNORE");
        }
        sb.appendLine();
        this.selectBuilder.querifyJoins(sb);
        sb.appendLine("SET");
        sb.scope((sb) => {
            sb.map(this.getAssignmentArr(), (sb, assignment) => {
                sb.append(assignment.column);
                sb.append(" = ");
                sb.append(raw_expr_1.RawExprUtil.querify(assignment.rawValue));
            }, ",\n");
        });
        this.selectBuilder.querifyWhere(sb);
    }
    getQuery() {
        const sb = new StringBuilder_1.StringBuilder();
        this.querify(sb);
        return sb.toString();
    }
    printQuery() {
        console.log(this.getQuery());
        return this;
    }
}
exports.UpdateBuilder = UpdateBuilder;
//# sourceMappingURL=update-builder.js.map