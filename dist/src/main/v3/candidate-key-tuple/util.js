"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sd = require("schema-decorator");
const candidate_key_1 = require("../candidate-key");
var CandidateKeyTupleUtil;
(function (CandidateKeyTupleUtil) {
    function toUnionAssertDelegate(candidateKeyTuple, columnMap) {
        return sd.or(...candidateKeyTuple
            .map(candidateKey => candidate_key_1.CandidateKeyUtil.toAssertDelegate(candidateKey, columnMap)));
    }
    CandidateKeyTupleUtil.toUnionAssertDelegate = toUnionAssertDelegate;
    function commonCandidateKeys(tupleA, tupleB) {
        const result = [];
        for (let a of tupleA) {
            for (let b of tupleB) {
                if (candidate_key_1.CandidateKeyUtil.isEqual(a, b)) {
                    result.push(a);
                    break;
                }
            }
        }
        return result;
    }
    CandidateKeyTupleUtil.commonCandidateKeys = commonCandidateKeys;
})(CandidateKeyTupleUtil = exports.CandidateKeyTupleUtil || (exports.CandidateKeyTupleUtil = {}));
//# sourceMappingURL=util.js.map