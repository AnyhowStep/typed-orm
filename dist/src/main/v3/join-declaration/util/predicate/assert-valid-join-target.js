"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function assertValidJoinTarget(fromTable, toTable) {
    if (fromTable.alias == toTable.alias) {
        throw new Error(`Cannot join two tables with the same name`);
    }
    return toTable;
}
exports.assertValidJoinTarget = assertValidJoinTarget;
//# sourceMappingURL=assert-valid-join-target.js.map