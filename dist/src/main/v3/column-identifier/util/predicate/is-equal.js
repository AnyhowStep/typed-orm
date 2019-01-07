"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isEqual(a, b) {
    return (a.tableAlias == b.tableAlias &&
        a.name == b.name);
}
exports.isEqual = isEqual;
function assertIsEqual(a, b) {
    if (a.tableAlias != b.tableAlias) {
        throw new Error(`Table alias mismatch ${a.tableAlias} != ${b.tableAlias}`);
    }
    if (a.name != b.name) {
        throw new Error(`Name mismatch ${a.name} != ${b.name}`);
    }
}
exports.assertIsEqual = assertIsEqual;
//# sourceMappingURL=is-equal.js.map