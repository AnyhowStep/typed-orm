"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const join_delegate_1 = require("./join-delegate");
const inner_join_1 = require("./inner-join");
const candidate_key_array_1 = require("../../../candidate-key-array");
/*
    This will force the "to-columns" to be a
    candidate key of the target table.
    No more, no less.
*/
function innerJoinOne(query, table, fromDelegate, toDelegate) {
    const { from, to } = join_delegate_1.invokeJoinDelegate(query, table, fromDelegate, toDelegate);
    const toKey = to.map(c => c.name);
    if (!candidate_key_array_1.CandidateKeyArrayUtil.hasKey(table.candidateKeys, toKey)) {
        throw new Error(`${toKey.join("|")} is not a candidate key of ${table.alias}`);
    }
    return inner_join_1.innerJoin(query, table, (() => from), (() => to));
}
exports.innerJoinOne = innerJoinOne;
//# sourceMappingURL=inner-join-ck.js.map