"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const inner_join_using_1 = require("./inner-join-using");
const candidate_key_array_1 = require("../../../candidate-key-array");
function innerJoinOneUsing(fromTable, toTable, usingDelegate) {
    const result = inner_join_using_1.innerJoinUsing(fromTable, toTable, usingDelegate);
    const toKey = result.to.map(c => c.name);
    if (!candidate_key_array_1.CandidateKeyArrayUtil.hasKey(result.toTable.candidateKeys, toKey)) {
        throw new Error(`${toKey.join("|")} is not a candidate key of ${result.toTable.alias}`);
    }
    return result;
}
exports.innerJoinOneUsing = innerJoinOneUsing;
//# sourceMappingURL=inner-join-one-using.js.map