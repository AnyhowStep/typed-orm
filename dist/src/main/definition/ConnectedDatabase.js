"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysql = require("typed-mysql");
const select_builder_1 = require("./select-builder");
const insert_1 = require("./insert");
const update_1 = require("./update");
class ConnectedDatabase extends mysql.ConnectedDatabase {
    constructor() {
        super(...arguments);
        this.from = select_builder_1.newCreateSelectBuilderDelegate(this);
        this.insertSelectInto = ((table, selectBuilder) => {
            return new insert_1.InsertSelectBuilder({
                table: table,
                selectBuilder: selectBuilder,
                ignore: false,
                columns: undefined,
            }, this);
        });
        this.insertValueInto = ((table) => {
            return new insert_1.InsertValueBuilder({
                table: table,
                ignore: false,
                values: undefined,
            }, this);
        });
        //TODO Implement proper transactions?
        //TODO Remove mysql.Database dependency?
        this.updateTable = ((selectBuilder) => {
            return new update_1.UpdateBuilder({
                selectBuilder: selectBuilder,
                ignoreErrors: false,
                assignments: undefined,
            }, this);
        });
    }
}
exports.ConnectedDatabase = ConnectedDatabase;
//# sourceMappingURL=ConnectedDatabase.js.map