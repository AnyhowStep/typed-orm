"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const type_map_1 = require("../../../type-map");
function primaryKeyAssertDelegate(table) {
    //https://github.com/Microsoft/TypeScript/issues/28592
    const primaryKey = table.primaryKey;
    const columns = table.columns;
    return type_map_1.TypeMapUtil.assertDelegateFromPrimaryKey(primaryKey, columns);
}
exports.primaryKeyAssertDelegate = primaryKeyAssertDelegate;
//# sourceMappingURL=primary-key-assert-delegate.js.map