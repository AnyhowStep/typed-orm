"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const candidate_key_1 = require("../../../../candidate-key");
const join_using_1 = require("../join-using");
function joinCkUsing(fromTable, toTable, usingDelegate, nullable, joinType) {
    const result = join_using_1.joinUsing(fromTable, toTable, usingDelegate, nullable, joinType);
    const toKey = result.to.map(c => c.name);
    if (!candidate_key_1.CandidateKeyUtil.Array.hasKey(result.toTable.candidateKeys, toKey)) {
        throw new Error(`${toKey.join("|")} is not a candidate key of ${result.toTable.alias}`);
    }
    return result;
}
exports.joinCkUsing = joinCkUsing;
//# sourceMappingURL=join-ck-using.js.map