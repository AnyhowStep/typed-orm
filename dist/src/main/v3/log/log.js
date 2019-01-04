"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LogUtil = require("./util");
class Log {
    constructor(data) {
        this.table = data.table;
        this.entityIdentifier = data.entityIdentifier;
        this.latestOrder = data.latestOrder;
        this.tracked = data.tracked;
        this.doNotCopy = data.doNotCopy;
        this.copy = data.copy;
        this.staticDefaultValue = data.staticDefaultValue;
        this.dynamicDefaultValueDelegate = data.dynamicDefaultValueDelegate;
    }
    setEntityIdentifier(delegate) {
        return LogUtil.setEntityIdentifier(this, delegate);
    }
    setLatestOrder(delegate) {
        return LogUtil.setLatestOrder(this, delegate);
    }
    setTracked(delegate) {
        return LogUtil.setTracked(this, delegate);
    }
    setDoNotCopy(delegate) {
        return LogUtil.setDoNotCopy(this, delegate);
    }
    setStaticDefaultValue(rawMap) {
        return LogUtil.setStaticDefaultValue(this, rawMap);
    }
    setDynamicDefaultValueDelegate(dynamicDefaultValueDelegate) {
        return LogUtil.setDynamicDefaultValueDelegate(this, dynamicDefaultValueDelegate);
    }
    latestQuery(entityIdentifier) {
        return LogUtil.latestQuery(this, entityIdentifier);
    }
    fetchLatestOrUndefined(entityIdentifier, connection) {
        return LogUtil.fetchLatestOrUndefined(this, entityIdentifier, connection);
    }
}
exports.Log = Log;
//# sourceMappingURL=log.js.map