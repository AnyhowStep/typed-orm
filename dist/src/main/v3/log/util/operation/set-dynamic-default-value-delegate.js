"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const log_1 = require("../../log");
function setDynamicDefaultValueDelegate(log, dynamicDefaultValueDelegate) {
    const { table, entityIdentifier, latestOrder, tracked, doNotCopy, copy, staticDefaultValue, } = log;
    return new log_1.Log({
        table,
        entityIdentifier,
        latestOrder,
        tracked,
        doNotCopy,
        copy,
        staticDefaultValue,
        dynamicDefaultValueDelegate,
    });
}
exports.setDynamicDefaultValueDelegate = setDynamicDefaultValueDelegate;
//# sourceMappingURL=set-dynamic-default-value-delegate.js.map