"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const insert_select_1 = require("../../insert-select");
const query_tree_1 = require("../../../query-tree");
const query_1 = require("../query");
async function execute(insert, connection) {
    if (!insert._table.insertAllowed) {
        throw new Error(`Cannot SELECT ... INSERT into table ${insert._table.alias}`);
    }
    const sql = query_tree_1.QueryTreeUtil.toSql(query_1.queryTree(insert));
    const result = await connection.insert(sql);
    if (insert._table.autoIncrement == undefined) {
        return result;
    }
    else {
        if (result.insertId == 0n) {
            if (insert._modifier != insert_select_1.InsertSelectModifier.IGNORE) {
                throw new Error(`Sucessful insertions should return an insertId for modifier ${insert._modifier}`);
            }
            return {
                ...result,
                [insert._table.autoIncrement]: undefined,
            };
        }
        else {
            return {
                ...result,
                [insert._table.autoIncrement]: result.insertId,
            };
        }
    }
}
exports.execute = execute;
//# sourceMappingURL=execute.js.map