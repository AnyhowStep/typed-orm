"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const join_using_1 = require("./join-using");
const join_1 = require("../../../../join");
function innerJoinUsing(query, aliasedTable, usingDelegate) {
    return join_using_1.joinUsing(query, aliasedTable, usingDelegate, false, join_1.JoinType.INNER);
}
exports.innerJoinUsing = innerJoinUsing;
//# sourceMappingURL=inner.js.map