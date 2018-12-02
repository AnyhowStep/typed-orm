"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const candidate_key_1 = require("../candidate-key");
var CandidateKeyArrayUtil;
(function (CandidateKeyArrayUtil) {
    function hasCommonCandidateKeys(arrayA, arrayB) {
        for (let a of arrayA) {
            for (let b of arrayB) {
                if (candidate_key_1.CandidateKeyUtil.isEqual(a, b)) {
                    return true;
                }
            }
        }
        return false;
    }
    CandidateKeyArrayUtil.hasCommonCandidateKeys = hasCommonCandidateKeys;
    function commonCandidateKeys(arrayA, arrayB) {
        const result = [];
        for (let a of arrayA) {
            for (let b of arrayB) {
                if (candidate_key_1.CandidateKeyUtil.isEqual(a, b)) {
                    result.push(a);
                    break;
                }
            }
        }
        return result;
    }
    CandidateKeyArrayUtil.commonCandidateKeys = commonCandidateKeys;
})(CandidateKeyArrayUtil = exports.CandidateKeyArrayUtil || (exports.CandidateKeyArrayUtil = {}));
//# sourceMappingURL=util.js.map