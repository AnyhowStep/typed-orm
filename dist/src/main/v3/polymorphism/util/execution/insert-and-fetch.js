"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const query_1 = require("../query");
const insert_1 = require("../../../insert");
const informationSchema = require("../../../information-schema");
async function insertAndFetch(connection, table, rawInsertRow) {
    if (table.parents.length == 0) {
        return insert_1.InsertUtil.insertAndFetch(connection, table, rawInsertRow);
    }
    let insertRow = { ...rawInsertRow };
    for (let g of query_1.uniqueGeneratedColumnNames(table)) {
        const column = query_1.tryGetGeneratedNonAutoIncrementColumn(table, g);
        if (column == undefined) {
            continue;
        }
        else {
            const generationExpression = await informationSchema.fetchGenerationExpression(connection, column);
            //This will be a `string`.
            //It's up to the individual assert delegates to
            //cast this to the appropriate data types.
            insertRow[g] = generationExpression;
        }
    }
    return connection.transactionIfNotInOne(async (connection) => {
        //In the event of diamond inheritance,
        //don't insert multiple rows for the base type
        const alreadyInserted = new Set();
        for (let p of table.parents) {
            if (alreadyInserted.has(p.alias)) {
                continue;
            }
            alreadyInserted.add(p.alias);
            const result = await insert_1.InsertUtil.insertAndFetch(connection, p, insertRow);
            insertRow = {
                ...insertRow,
                //We want to overwrite any Expr<> instances with
                //actual values, if applicable
                ...result,
            };
        }
        //We *should* have gotten rid of any Expr<> instances by now
        const result = {
            ...insertRow,
            ...(await insert_1.InsertUtil.insertAndFetch(connection, table, insertRow)),
        };
        //One final effort to check we really have all the correct values
        return query_1.assertDelegate(table)(`${table.alias}`, result);
    });
}
exports.insertAndFetch = insertAndFetch;
//# sourceMappingURL=insert-and-fetch.js.map