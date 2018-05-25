"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysql = require("typed-mysql");
const join_collection_1 = require("./join-collection");
const StringBuilder_1 = require("./StringBuilder");
class DeleteBuilder {
    constructor(selectBuilder, deleteTables, willIgnoreErrors, db) {
        this.selectBuilder = selectBuilder;
        this.deleteTables = deleteTables;
        this.willIgnoreErrors = willIgnoreErrors;
        this.db = db;
    }
    //Ignores errors, you really should not call this
    ignoreErrors(ignoreErrors = true) {
        return new DeleteBuilder(this.selectBuilder, this.deleteTables, ignoreErrors, this.db);
    }
    ;
    tables(delegate) {
        const joins = this.selectBuilder.data.joins;
        if (delegate == undefined) {
            return new DeleteBuilder(this.selectBuilder, joins.map((join) => join.table), this.willIgnoreErrors, this.db);
        }
        else {
            const tables = delegate(join_collection_1.JoinCollectionUtil.toTableCollection(joins));
            if (tables.length == 0) {
                throw new Error(`Cannot delete from zero tables`);
            }
            for (let table of tables) {
                if (joins.find(join => join.table == table) == undefined) {
                    throw new Error(`Unknown table ${table.alias}`);
                }
            }
            return new DeleteBuilder(this.selectBuilder, tables, this.willIgnoreErrors, this.db);
        }
    }
    execute() {
        return this.db.rawDelete(this.getQuery(), {});
    }
    getTableAliases() {
        if (this.deleteTables == undefined) {
            throw new Error(`Call tables() first`);
        }
        const deleteTables = this.deleteTables;
        const tableNameDict = {};
        for (let t of deleteTables) {
            tableNameDict[t.alias] = true;
        }
        const tableNames = Object.keys(tableNameDict);
        if (tableNames.length == 0) {
            throw new Error(`Cannot delete from zero tables`);
        }
        return tableNames;
    }
    querify(sb) {
        sb.append("DELETE");
        if (this.willIgnoreErrors) {
            sb.append(" IGNORE");
        }
        sb.appendLine();
        sb.scope((sb) => {
            sb.map(this.getTableAliases(), (sb, tableAlias) => {
                sb.append(mysql.escapeId(tableAlias));
            }, ",\n");
        });
        sb.appendLine("FROM");
        this.selectBuilder.querifyJoins(sb);
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
exports.DeleteBuilder = DeleteBuilder;
//# sourceMappingURL=delete-builder.js.map