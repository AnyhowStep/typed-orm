"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const operation = require("../../operation");
function toNullable(joins) {
    return joins.map((join) => {
        return operation.toNullable(join);
    });
}
exports.toNullable = toNullable;
//# sourceMappingURL=to-nullable.js.map