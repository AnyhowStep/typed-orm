"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysql = require("typed-mysql");
const select_builder_1 = require("./select-builder");
class Database extends mysql.Database {
    constructor() {
        super(...arguments);
        this.from = select_builder_1.newCreateSelectBuilderDelegate(this);
    }
}
exports.Database = Database;
//# sourceMappingURL=Database.js.map