"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const execute_and_fetch_1 = require("../execute-and-fetch");
const constructor_1 = require("../../constructor");
async function insertAndFetch(connection, table, insertRow) {
    return execute_and_fetch_1.executeAndFetch(constructor_1.insertInto(table)
        .values(insertRow), connection);
}
exports.insertAndFetch = insertAndFetch;
//# sourceMappingURL=insert-and-fetch.js.map