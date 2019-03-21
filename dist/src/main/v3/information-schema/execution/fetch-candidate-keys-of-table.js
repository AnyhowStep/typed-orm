"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const query_1 = require("../../query");
const statistics_1 = require("../statistics");
const exprLib = require("../../expr-library");
function fetchCandidateKeysOfTable(connection, tableName) {
    return query_1.QueryUtil.newInstance()
        .from(statistics_1.STATISTICS)
        .where(c => exprLib.nullSafeEq(c.TABLE_SCHEMA, exprLib.database()))
        .where(c => exprLib.eq(c.TABLE_NAME, tableName))
        //We want unique keys
        .where(c => exprLib.not(c.NON_UNIQUE))
        .select(c => [
        c.INDEX_NAME,
        c.COLUMN_NAME,
    ])
        .orderBy(c => [
        c.INDEX_NAME.asc(),
        c.SEQ_IN_INDEX.asc(),
    ])
        .fetchAll(connection)
        .then(columns => {
        const result = [];
        for (let column of columns) {
            let index = result.find(index => index.name == column.INDEX_NAME);
            if (index == undefined) {
                index = {
                    name: column.INDEX_NAME,
                    columns: [],
                };
                result.push(index);
            }
            index.columns.push(column.COLUMN_NAME);
        }
        return result;
    });
}
exports.fetchCandidateKeysOfTable = fetchCandidateKeysOfTable;
//# sourceMappingURL=fetch-candidate-keys-of-table.js.map