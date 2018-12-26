"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const join_using_1 = require("./join-using");
const join_1 = require("../../../../join");
function leftJoinUsing(query, aliasedTable, usingDelegate) {
    return join_using_1.joinUsing(query, aliasedTable, usingDelegate, true, join_1.JoinType.LEFT);
}
exports.leftJoinUsing = leftJoinUsing;
//# sourceMappingURL=left.js.map