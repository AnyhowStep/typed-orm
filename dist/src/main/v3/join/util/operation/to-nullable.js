"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const join_1 = require("../../join");
function toNullable(join) {
    const { aliasedTable, columns, } = join;
    const result = new join_1.Join({
        aliasedTable,
        columns,
        nullable: true,
    }, join.joinType, join.from, join.to);
    return result;
}
exports.toNullable = toNullable;
//# sourceMappingURL=to-nullable.js.map