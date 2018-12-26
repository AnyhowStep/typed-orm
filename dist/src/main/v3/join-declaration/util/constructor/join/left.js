"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const join_1 = require("../../../../join");
const join_2 = require("./join");
function leftJoin(fromTable, toTable, fromDelegate, toDelegate) {
    return join_2.join(fromTable, toTable, fromDelegate, toDelegate, true, join_1.JoinType.LEFT);
}
exports.leftJoin = leftJoin;
//# sourceMappingURL=left.js.map