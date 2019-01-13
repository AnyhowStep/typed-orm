"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const key_1 = require("../../../../key");
const join_1 = require("../join");
function joinCk(fromTable, toTable, fromDelegate, toDelegate, nullable, joinType) {
    const result = join_1.join(fromTable, toTable, fromDelegate, toDelegate, nullable, joinType);
    const toKey = result.to.map(c => c.name);
    if (!key_1.KeyUtil.Array.hasKey(result.toTable.candidateKeys, toKey)) {
        throw new Error(`${toKey.join("|")} is not a candidate key of ${result.toTable.alias}`);
    }
    return result;
}
exports.joinCk = joinCk;
//# sourceMappingURL=join-ck.js.map