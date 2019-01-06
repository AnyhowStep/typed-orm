"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const log_1 = require("../../log");
function log(table) {
    return new log_1.Log({
        table,
        entity: undefined,
        entityIdentifier: undefined,
        joinDeclaration: undefined,
        latestOrder: undefined,
        tracked: undefined,
        doNotCopy: undefined,
        copy: Object.keys(table.columns)
            .filter(columnName => table.generated.indexOf(columnName) < 0),
        copyDefaultsDelegate: undefined,
        trackedDefaults: undefined,
    });
}
exports.log = log;
//# sourceMappingURL=log.js.map