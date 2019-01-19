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
    exists(connection, entityIdentifier) {
        return LogUtil.exists(this, connection, entityIdentifier);
    }
    fetchDefault(connection, entityIdentifier) {
        return LogUtil.fetchDefault(this, connection, entityIdentifier);
    }
    fetchLatestOrDefault(connection, entityIdentifier) {
        return LogUtil.fetchLatestOrDefault(this, connection, entityIdentifier);
    }
    fetchLatestOrError(connection, entityIdentifier) {
        return LogUtil.fetchLatestOrError(this, connection, entityIdentifier);
    }
    fetchLatestOrUndefined(connection, entityIdentifier) {
        return LogUtil.fetchLatestOrUndefined(this, connection, entityIdentifier);
    }
    fetchLatestOrderOrError(connection, entityIdentifier) {
        return LogUtil.fetchLatestOrderOrError(this, connection, entityIdentifier);
    }
    fetchLatestOrderOrUndefined(connection, entityIdentifier) {
        return LogUtil.fetchLatestOrderOrUndefined(this, connection, entityIdentifier);
    }
    fetchLatestValueOrDefault(connection, entityIdentifier, delegate) {
        return LogUtil.fetchLatestValueOrDefault(this, connection, entityIdentifier, delegate);
    }
    fetchLatestValueOrError(connection, entityIdentifier, delegate) {
        return LogUtil.fetchLatestValueOrError(this, connection, entityIdentifier, delegate);
    }
    fetchLatestValueOrUndefined(connection, entityIdentifier, delegate) {
        return LogUtil.fetchLatestValueOrUndefined(this, connection, entityIdentifier, delegate);
    }
    existsOfEntity() {
        return LogUtil.existsOfEntity(this);
    }
    latestOfEntity() {
        return LogUtil.latestOfEntity(this);
    }
    latestOrderOfEntityOrNull() {
        return LogUtil.latestOrderOfEntityOrNull(this);
    }
    latestValueOfEntityOrNull(delegate) {
        return LogUtil.latestValueOfEntityOrNull(this, delegate);
    }
    latestValueOfEntity(delegate) {
        return LogUtil.latestValueOfEntity(this, delegate);
    }
    trackOrError(connection, entityIdentifier, trackRow) {
        return LogUtil.trackOrError(this, connection, entityIdentifier, trackRow);
    }
    track(connection, entityIdentifier, trackRow) {
        return LogUtil.track(this, connection, entityIdentifier, trackRow);
    }
    latest(entityIdentifier) {
        return LogUtil.latest(this, entityIdentifier);
    }
}
exports.Log = Log;
//# sourceMappingURL=log.js.map