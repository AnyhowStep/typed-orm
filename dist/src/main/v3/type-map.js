"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sd = require("schema-decorator");
var TypeMapUtil;
(function (TypeMapUtil) {
    function assertDelegateFromCandidateKey(candidateKey, columnMap) {
        const fields = [];
        for (let columnName in columnMap) {
            /*
                It's possible that this is not an IColumnUtil.
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
    TypeMapUtil.assertDelegateFromCandidateKey = assertDelegateFromCandidateKey;
    function assertDelegateFromCandidateKeyArray(candidateKeyTuple, columnMap) {
        return sd.or(...candidateKeyTuple
            .map(candidateKey => assertDelegateFromCandidateKey(candidateKey, columnMap)));
    }
    TypeMapUtil.assertDelegateFromCandidateKeyArray = assertDelegateFromCandidateKeyArray;
    function superKeyAssertDelegateFromCandidateKey(candidateKey, columnMap) {
        const fields = [];
        for (let columnName in columnMap) {
            /*
                It's possible that this is not an IColumnUtil.
                But, in general, if we pass in candidateKey and columnMap
                without any outside hack-ery, this should be correct.
            */
            const column = columnMap[columnName];
            if (candidateKey.indexOf(column.name) >= 0) {
                fields.push(sd.field(column.name, column.assertDelegate));
            }
            else {
                fields.push(sd.field(column.name, sd.optional(column.assertDelegate)));
            }
        }
        return sd.schema(...fields);
    }
    TypeMapUtil.superKeyAssertDelegateFromCandidateKey = superKeyAssertDelegateFromCandidateKey;
    function superKeyAssertDelegateFromCandidateKeyArray(candidateKeyTuple, columnMap) {
        return sd.or(...candidateKeyTuple
            .map(candidateKey => superKeyAssertDelegateFromCandidateKey(candidateKey, columnMap)));
    }
    TypeMapUtil.superKeyAssertDelegateFromCandidateKeyArray = superKeyAssertDelegateFromCandidateKeyArray;
    function assertDelegateFromPrimaryKey(primaryKey, columnMap) {
        const fields = [];
        for (let columnName in columnMap) {
            /*
                It's possible that this is not an IColumnUtil.
                But, in general, if we pass in candidateKey and columnMap
                without any outside hack-ery, this should be correct.
            */
            const column = columnMap[columnName];
            if (primaryKey.indexOf(column.name) >= 0) {
                fields.push(sd.field(column.name, column.assertDelegate));
            }
        }
        return sd.schema(...fields);
    }
    TypeMapUtil.assertDelegateFromPrimaryKey = assertDelegateFromPrimaryKey;
})(TypeMapUtil = exports.TypeMapUtil || (exports.TypeMapUtil = {}));
//# sourceMappingURL=type-map.js.map