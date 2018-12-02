"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CandidateKeyUtil;
(function (CandidateKeyUtil) {
    function isEqual(a, b) {
        return (a.every(aKey => b.indexOf(aKey) >= 0) &&
            b.every(bKey => a.indexOf(bKey) >= 0));
    }
    CandidateKeyUtil.isEqual = isEqual;
})(CandidateKeyUtil = exports.CandidateKeyUtil || (exports.CandidateKeyUtil = {}));
//# sourceMappingURL=util.js.map