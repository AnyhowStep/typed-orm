"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const delete_1 = require("../../../../delete");
function deleteIgnore(query, delegate) {
    return delete_1.DeleteUtil.delete(query, delete_1.DeleteModifier.IGNORE, delegate);
}
exports.deleteIgnore = deleteIgnore;
//# sourceMappingURL=delete-ignore.js.map