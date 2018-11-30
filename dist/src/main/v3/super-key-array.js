"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sd = require("schema-decorator");
const super_key_1 = require("./super-key");
var SuperKeyArrayUtil;
(function (SuperKeyArrayUtil) {
    function toUnionAssertDelegate(candidateKeyTuple, columnMap) {
        return sd.or(...candidateKeyTuple
            .map(candidateKey => super_key_1.SuperKeyUtil.toAssertDelegate(candidateKey, columnMap)));
    }
    SuperKeyArrayUtil.toUnionAssertDelegate = toUnionAssertDelegate;
})(SuperKeyArrayUtil = exports.SuperKeyArrayUtil || (exports.SuperKeyArrayUtil = {}));
//# sourceMappingURL=super-key-array.js.map