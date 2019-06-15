"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sd = require("type-mapping");
const column_map_1 = require("../column-map");
var CandidateKeyUtil;
(function (CandidateKeyUtil) {
    function assertDelegate(table) {
        return sd.unsafeOr(...table.candidateKeys.map((candidateKey) => {
            return column_map_1.ColumnMapUtil.assertDelegate(column_map_1.ColumnMapUtil.pick(table.columns, candidateKey));
        }));
    }
    CandidateKeyUtil.assertDelegate = assertDelegate;
})(CandidateKeyUtil = exports.CandidateKeyUtil || (exports.CandidateKeyUtil = {}));
//# sourceMappingURL=index.js.map