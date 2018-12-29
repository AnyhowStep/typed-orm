"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CandidateKeyUtil;
(function (CandidateKeyUtil) {
    function isSubKey(a, b) {
        return a.every(aKey => b.indexOf(aKey) >= 0);
    }
    CandidateKeyUtil.isSubKey = isSubKey;
    function isEqual(a, b) {
        return (isSubKey(a, b) &&
            isSubKey(b, a));
    }
    CandidateKeyUtil.isEqual = isEqual;
    function isCandidateKey(raw) {
        if (!(raw instanceof Array)) {
            return false;
        }
        for (let item of raw) {
            if (typeof item != "string") {
                return false;
            }
        }
        return true;
    }
    CandidateKeyUtil.isCandidateKey = isCandidateKey;
})(CandidateKeyUtil = exports.CandidateKeyUtil || (exports.CandidateKeyUtil = {}));
//# sourceMappingURL=util.js.map