"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const join_1 = require("../join");
const candidate_key_array_1 = require("../../../../candidate-key-array");
function joinCk(query, table, fromDelegate, toDelegate, nullable, joinType) {
    const result = join_1.join(query, table, fromDelegate, toDelegate, nullable, joinType);
    const lastJoin = result._joins[result._joins.length - 1];
    const toKey = lastJoin.to.map(c => c.name);
    if (!candidate_key_array_1.CandidateKeyArrayUtil.hasKey(table.candidateKeys, toKey)) {
        throw new Error(`${toKey.join("|")} is not a candidate key of ${table.alias}`);
    }
    return result;
}
exports.joinCk = joinCk;
//# sourceMappingURL=join-ck.js.map