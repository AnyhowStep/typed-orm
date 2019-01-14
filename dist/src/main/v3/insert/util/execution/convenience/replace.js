"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const execute_1 = require("../execute");
const constructor_1 = require("../../constructor");
async function replace(connection, table, insertRow) {
    return execute_1.execute(constructor_1.replaceInto(table)
        .values(insertRow), connection);
}
exports.replace = replace;
//# sourceMappingURL=replace.js.map