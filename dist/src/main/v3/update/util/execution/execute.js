"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const query_tree_1 = require("../../../query-tree");
const query_1 = require("../query");
/*export type Execute<
    InsertT extends IInsert & { _values : InsertRow<ITable>[] }
> = (
    InsertResult &
    (
        InsertT["_table"]["autoIncrement"] extends string ?
        {
            [k in InsertT["_table"]["autoIncrement"]] : (
                InsertModifier.IGNORE extends InsertT["_modifier"] ?
                undefined|bigint :
                undefined extends InsertT["_modifier"] ?
                bigint :
                InsertModifier.REPLACE extends InsertT["_modifier"] ?
                bigint :
                never
            )
        } :
        {}
    )
);*/
async function execute(update, connection) {
    const sql = query_tree_1.QueryTreeUtil.toSqlPretty(query_1.queryTree(update));
    const result = await connection.update(sql);
    return result;
}
exports.execute = execute;
//# sourceMappingURL=execute.js.map