"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sd = require("schema-decorator");
var CandidateKeyUtil;
(function (CandidateKeyUtil) {
    function toAssertDelegate(candidateKey, columnMap) {
        const fields = [];
        for (let columnName in columnMap) {
            /*
                It's possible that this is not an IColumn.
                But, in general, if we pass in candidateKey and columnMap
                without any outside hack-ery, this should be correct.
            */
            const column = columnMap[columnName];
            if (candidateKey.indexOf(column.name) >= 0) {
                fields.push(sd.field(column.name, column.assertDelegate));
            }
        }
        return sd.schema(...fields);
    }
    CandidateKeyUtil.toAssertDelegate = toAssertDelegate;
    function isEqual(a, b) {
        return (a.every(aKey => b.indexOf(aKey) >= 0) &&
            b.every(bKey => a.indexOf(bKey) >= 0));
    }
    CandidateKeyUtil.isEqual = isEqual;
})(CandidateKeyUtil = exports.CandidateKeyUtil || (exports.CandidateKeyUtil = {}));
//# sourceMappingURL=util.js.map