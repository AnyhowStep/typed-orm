"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sd = require("schema-decorator");
function entityIdentifierAssertDelegate(log) {
    const obj = {};
    for (let columnName of log.entityIdentifier) {
        obj[columnName] = log.table.columns[columnName].assertDelegate;
    }
    return sd.toSchema(obj);
}
exports.entityIdentifierAssertDelegate = entityIdentifierAssertDelegate;
//# sourceMappingURL=entity-identifier-assert-delegate.js.map