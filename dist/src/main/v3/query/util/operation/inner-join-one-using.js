"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const join_using_delegate_1 = require("./join-using-delegate");
const candidate_key_array_1 = require("../../../candidate-key-array");
const inner_join_using_1 = require("./inner-join-using");
function innerJoinOneUsing(query, table, usingDelegate) {
    const using = join_using_delegate_1.invokeJoinUsingDelegate(query, table, usingDelegate);
    const usingKey = using.map(c => c.name);
    if (!candidate_key_array_1.CandidateKeyArrayUtil.hasKey(table.candidateKeys, usingKey)) {
        throw new Error(`${usingKey.join("|")} is not a candidate key of ${table.alias}`);
    }
    return inner_join_using_1.innerJoinUsing(query, table, () => using);
}
exports.innerJoinOneUsing = innerJoinOneUsing;
//# sourceMappingURL=inner-join-one-using.js.map