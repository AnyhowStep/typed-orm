"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const update_1 = require("../../../../update");
function set(query, delegate) {
    if (update_1.UpdateUtil.isSingleTableUpdatableQuery(query)) {
        return update_1.UpdateUtil.singleTableUpdate(query, undefined, delegate);
    }
    else {
        return update_1.UpdateUtil.multiTableUpdate(query, undefined, delegate);
    }
}
exports.set = set;
//# sourceMappingURL=update.js.map