"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const operation = require("../../operation");
function replaceColumn(joins, column) {
    return joins.map(join => operation.replaceColumn(join, column));
}
exports.replaceColumn = replaceColumn;
//# sourceMappingURL=replace-column.js.map