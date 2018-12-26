"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const join_using_1 = require("../join-using");
const join_ck_1 = require("../join-ck");
function joinCkUsing(query, table, usingDelegate, nullable, joinType) {
    const { _joins } = join_using_1.joinUsing(query, table, usingDelegate, nullable, joinType);
    const lastJoin = _joins[_joins.length - 1];
    return join_ck_1.joinCk(query, table, () => lastJoin.from, () => lastJoin.to, nullable, joinType);
}
exports.joinCkUsing = joinCkUsing;
//# sourceMappingURL=join-ck-using.js.map