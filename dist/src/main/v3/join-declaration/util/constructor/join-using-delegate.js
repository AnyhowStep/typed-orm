"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const join_delegate_1 = require("./join-delegate");
function invokeJoinUsingDelegate(fromTable, toTable, usingDelegate, nullable, joinType) {
    const usingColumns = (usingDelegate(fromTable.columns));
    return join_delegate_1.invokeJoinDelegate(fromTable, toTable, () => usingColumns, () => (usingColumns.map(c => toTable.columns[c.name])), nullable, joinType);
}
exports.invokeJoinUsingDelegate = invokeJoinUsingDelegate;
//# sourceMappingURL=join-using-delegate.js.map