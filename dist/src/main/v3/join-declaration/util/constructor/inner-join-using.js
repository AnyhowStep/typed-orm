"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const inner_join_1 = require("./inner-join");
function innerJoinUsing(fromTable, toTable, usingDelegate) {
    const usingColumns = (usingDelegate(fromTable.columns));
    return inner_join_1.innerJoin(fromTable, toTable, () => usingColumns, () => (usingColumns.map(c => toTable.columns[c.name])));
}
exports.innerJoinUsing = innerJoinUsing;
//# sourceMappingURL=inner-join-using.js.map