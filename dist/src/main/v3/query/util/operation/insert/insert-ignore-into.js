"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const insert_select_1 = require("../../../../insert-select");
function insertIgnoreInto(query, table, delegate) {
    return insert_select_1.InsertSelectUtil.insertSelect(query, insert_select_1.InsertSelectModifier.IGNORE, table, delegate);
}
exports.insertIgnoreInto = insertIgnoreInto;
//# sourceMappingURL=insert-ignore-into.js.map