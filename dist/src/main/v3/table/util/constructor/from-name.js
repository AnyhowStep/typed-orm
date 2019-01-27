"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sqlstring_1 = require("sqlstring");
const table_1 = require("../../table");
function fromName(name) {
    return new table_1.Table({
        usedColumns: [],
        alias: name,
        columns: {},
        autoIncrement: undefined,
        id: undefined,
        primaryKey: undefined,
        candidateKeys: [],
        generated: [],
        isNullable: [],
        hasExplicitDefaultValue: [],
        mutable: [],
        parents: [],
        insertAllowed: true,
        deleteAllowed: true,
    }, {
        unaliasedQuery: sqlstring_1.escapeId(name),
    });
}
exports.fromName = fromName;
//# sourceMappingURL=from-name.js.map