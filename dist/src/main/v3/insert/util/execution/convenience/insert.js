"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const execute_1 = require("../execute");
const constructor_1 = require("../../constructor");
async function insert(connection, table, insertRow) {
    return execute_1.execute(constructor_1.insertInto(table)
        .values(insertRow), connection);
}
exports.insert = insert;
//# sourceMappingURL=insert.js.map