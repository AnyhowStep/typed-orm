"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysql = require("typed-mysql");
const select_builder_1 = require("./select-builder");
const insert_1 = require("./insert");
class Database extends mysql.Database {
    constructor() {
        super(...arguments);
        this.from = select_builder_1.newCreateSelectBuilderDelegate(this);
        this.insertValueInto = ((table) => {
            return new insert_1.InsertValueBuilder({
                table: table,
                ignore: false,
                values: undefined,
            }, this);
        });
    }
}
exports.Database = Database;
//# sourceMappingURL=Database.js.map