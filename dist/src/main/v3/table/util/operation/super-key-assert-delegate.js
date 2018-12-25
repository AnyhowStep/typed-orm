"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const type_map_1 = require("../../../type-map");
function superKeyAssertDelegate(table) {
    //https://github.com/Microsoft/TypeScript/issues/28592
    const candidateKeys = table.candidateKeys;
    const columns = table.columns;
    return type_map_1.TypeMapUtil.superKeyAssertDelegateFromCandidateKeyArray(candidateKeys, columns);
}
exports.superKeyAssertDelegate = superKeyAssertDelegate;
//# sourceMappingURL=super-key-assert-delegate.js.map