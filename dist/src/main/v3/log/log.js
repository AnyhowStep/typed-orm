"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LogUtil = require("./util");
class Log {
    constructor(data) {
        this.table = data.table;
        this.entity = data.entity;
        this.entityIdentifier = data.entityIdentifier;
        this.joinDeclaration = data.joinDeclaration;
        this.latestOrder = data.latestOrder;
        this.tracked = data.tracked;
        this.doNotCopy = data.doNotCopy;
        this.copy = data.copy;
        this.copyDefaultsDelegate = data.copyDefaultsDelegate;
        this.trackedDefaults = data.trackedDefaults;
    }
    setEntity(entity) {
        return LogUtil.setEntity(this, entity);
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
    setCopyDefaultsDelegate(dynamicDefaultValueDelegate) {
        return LogUtil.setCopyDefaultsDelegate(this, dynamicDefaultValueDelegate);
    }
    setTrackedDefaults(rawMap) {
        return LogUtil.setTrackedDefaults(this, rawMap);
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