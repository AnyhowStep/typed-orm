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
    function hasSubKey(arr, key) {
        for (let k of arr) {
            if (candidate_key_1.CandidateKeyUtil.isSubKey(k, key)) {
                return true;
            }
        }
        return false;
    }
    CandidateKeyArrayUtil.hasSubKey = hasSubKey;
    function hasSuperKey(arr, key) {
        for (let k of arr) {
            if (candidate_key_1.CandidateKeyUtil.isSubKey(key, k)) {
                return true;
            }
        }
        return false;
    }
    CandidateKeyArrayUtil.hasSuperKey = hasSuperKey;
    function hasKey(arr, key) {
        for (let k of arr) {
            if (candidate_key_1.CandidateKeyUtil.isEqual(k, key)) {
                return true;
            }
        }
        return false;
    }
    CandidateKeyArrayUtil.hasKey = hasKey;
    function isCandidateKeyArray(raw) {
        if (!(raw instanceof Array)) {
            return false;
        }
        for (let item of raw) {
            if (!candidate_key_1.CandidateKeyUtil.isCandidateKey(item)) {
                return false;
            }
        }
        return true;
    }
    CandidateKeyArrayUtil.isCandidateKeyArray = isCandidateKeyArray;
})(CandidateKeyArrayUtil = exports.CandidateKeyArrayUtil || (exports.CandidateKeyArrayUtil = {}));
//# sourceMappingURL=util.js.map