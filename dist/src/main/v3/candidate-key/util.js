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
})(CandidateKeyUtil = exports.CandidateKeyUtil || (exports.CandidateKeyUtil = {}));
//# sourceMappingURL=util.js.map