"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const join_1 = require("../../../../join");
const join_2 = require("./join");
function innerJoin(query, aliasedTable, fromDelegate, toDelegate) {
    return join_2.join(query, aliasedTable, fromDelegate, toDelegate, false, join_1.JoinType.INNER);
}
exports.innerJoin = innerJoin;
//# sourceMappingURL=inner.js.map