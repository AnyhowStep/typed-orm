"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const column_1 = require("../../column");
function setIsInSelectClause(column, __isInSelectClause) {
    return new column_1.Column(column, column.__subTableName, __isInSelectClause);
}
exports.setIsInSelectClause = setIsInSelectClause;
//# sourceMappingURL=set-is-in-select-clause.js.map