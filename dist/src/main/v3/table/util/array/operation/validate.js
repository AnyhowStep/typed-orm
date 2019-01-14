"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tables_1 = require("../../../../information-schema/tables");
const query_1 = require("../../../../query");
const exprLib = require("../../../../expr-library");
const operation = require("../../operation");
async function validate(tables, connection, result) {
    const extraDbTables = await query_1.QueryUtil.newInstance()
        .from(tables_1.TABLES)
        .where(c => exprLib.nullSafeEq(c.TABLE_SCHEMA, exprLib.database()))
        .where(c => exprLib.notIn(c.TABLE_NAME, ...tables.map(table => table.alias)))
        .select(c => [c.TABLE_NAME])
        .fetchValueArray(connection);
    for (let extraDbTable of extraDbTables) {
        result.warnings.push(`${extraDbTable} on database; not in code`);
    }
    for (let table of tables) {
        await operation.validate(table, connection, result);
    }
}
exports.validate = validate;
//# sourceMappingURL=validate.js.map