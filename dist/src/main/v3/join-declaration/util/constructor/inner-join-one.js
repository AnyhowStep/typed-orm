"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const inner_join_1 = require("./inner-join");
const candidate_key_array_1 = require("../../../candidate-key-array");
function innerJoinOne(fromTable, toTable, fromDelegate, toDelegate) {
    const result = inner_join_1.innerJoin(fromTable, toTable, fromDelegate, toDelegate);
    const toKey = result.to.map(c => c.name);
    if (!candidate_key_array_1.CandidateKeyArrayUtil.hasKey(result.toTable.candidateKeys, toKey)) {
        throw new Error(`${toKey.join("|")} is not a candidate key of ${result.toTable.alias}`);
    }
    return result;
}
exports.innerJoinOne = innerJoinOne;
//# sourceMappingURL=inner-join-one.js.map