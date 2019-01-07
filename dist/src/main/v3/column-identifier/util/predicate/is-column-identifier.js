"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const type_1 = require("../../../type");
function isColumnIdentifier(raw) {
    if (!type_1.isObjectWithKeys(raw, [
        "tableAlias",
        "name"
    ])) {
        return false;
    }
    return ((typeof raw.tableAlias == "string") &&
        (typeof raw.name == "string"));
}
exports.isColumnIdentifier = isColumnIdentifier;
//# sourceMappingURL=is-column-identifier.js.map