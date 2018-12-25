"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const candidate_key_array_1 = require("../../../candidate-key-array");
const join_using_delegate_1 = require("./join-using-delegate");
function invokeJoinOneUsing(fromTable, toTable, usingDelegate, nullable, joinType) {
    const result = join_using_delegate_1.invokeJoinUsingDelegate(fromTable, toTable, usingDelegate, nullable, joinType);
    const toKey = result.to.map(c => c.name);
    if (!candidate_key_array_1.CandidateKeyArrayUtil.hasKey(result.toTable.candidateKeys, toKey)) {
        throw new Error(`${toKey.join("|")} is not a candidate key of ${result.toTable.alias}`);
    }
    return result;
}
exports.invokeJoinOneUsing = invokeJoinOneUsing;
//# sourceMappingURL=join-one-using-delegate.js.map