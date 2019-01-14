"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const execute_1 = require("../execute");
const constructor_1 = require("../../constructor");
async function insertIgnore(connection, table, insertRow) {
    return execute_1.execute(constructor_1.insertIgnoreInto(table)
        .values(insertRow), connection);
}
exports.insertIgnore = insertIgnore;
//# sourceMappingURL=insert-ignore.js.map