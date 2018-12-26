"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const join_1 = require("../join");
function joinUsing(fromTable, toTable, usingDelegate, nullable, joinType) {
    const usingColumns = (usingDelegate(fromTable.columns));
    return join_1.join(fromTable, toTable, () => usingColumns, () => (usingColumns.map(c => toTable.columns[c.name])), nullable, joinType);
}
exports.joinUsing = joinUsing;
//# sourceMappingURL=join-using.js.map