"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const insert_select_1 = require("../../../../insert-select");
function insertInto(query, table, delegate) {
    return insert_select_1.InsertSelectUtil.insertSelect(query, undefined, table, delegate);
}
exports.insertInto = insertInto;
//# sourceMappingURL=insert-into.js.map