"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sd = require("schema-decorator");
const super_key_1 = require("./super-key");
var SuperKeyTupleUtil;
(function (SuperKeyTupleUtil) {
    function toUnionAssertDelegate(candidateKeyTuple, columnMap) {
        return sd.or(...candidateKeyTuple
            .map(candidateKey => super_key_1.SuperKeyUtil.toAssertDelegate(candidateKey, columnMap)));
    }
    SuperKeyTupleUtil.toUnionAssertDelegate = toUnionAssertDelegate;
})(SuperKeyTupleUtil = exports.SuperKeyTupleUtil || (exports.SuperKeyTupleUtil = {}));
//# sourceMappingURL=super-key-tuple.js.map