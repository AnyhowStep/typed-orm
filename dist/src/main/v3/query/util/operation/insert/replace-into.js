"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const insert_select_1 = require("../../../../insert-select");
function replaceInto(query, table, delegate) {
    return insert_select_1.InsertSelectUtil.insertSelect(query, insert_select_1.InsertSelectModifier.REPLACE, table, delegate);
}
exports.replaceInto = replaceInto;
//# sourceMappingURL=replace-into.js.map