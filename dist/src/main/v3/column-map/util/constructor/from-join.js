"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const operation_1 = require("../operation");
function fromJoin(join) {
    if (join.nullable) {
        return operation_1.toNullable(join.columns);
    }
    else {
        return join.columns;
    }
}
exports.fromJoin = fromJoin;
//# sourceMappingURL=from-join.js.map