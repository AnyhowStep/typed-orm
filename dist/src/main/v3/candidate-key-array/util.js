"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sd = require("schema-decorator");
const candidate_key_1 = require("../candidate-key");
var CandidateKeyArrayUtil;
(function (CandidateKeyArrayUtil) {
    function toUnionAssertDelegate(candidateKeyTuple, columnMap) {
        return sd.or(...candidateKeyTuple
            .map(candidateKey => candidate_key_1.CandidateKeyUtil.toAssertDelegate(candidateKey, columnMap)));
    }
    CandidateKeyArrayUtil.toUnionAssertDelegate = toUnionAssertDelegate;
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
/*
import {IColumn} from "../column";
declare const ckt : [
    ("x"|"y")[],
    ("y"|"z")[]
];
declare const cm : {
    x : IColumn<{ tableAlias : "table", name : "x", assertDelegate : sd.AssertDelegate<string> }>,
    y : IColumn<{ tableAlias : "table", name : "y", assertDelegate : sd.AssertDelegate<number> }>,
    z : IColumn<{ tableAlias : "table", name : "z", assertDelegate : sd.AssertDelegate<boolean> }>
}
declare const uad : CandidateKeyArrayUtil.ToUnionAssertDelegate<typeof ckt, typeof cm>;
//*/ 
//# sourceMappingURL=util.js.map