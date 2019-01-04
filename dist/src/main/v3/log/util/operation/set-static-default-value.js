"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const log_1 = require("../../log");
function setStaticDefaultValue(log, rawMap) {
    const staticDefaultValue = {};
    for (let columnName of [
        ...log.tracked,
        ...log.copy,
    ]) {
        const rawValue = rawMap[columnName];
        if (rawValue === undefined) {
            continue;
        }
        const value = log.table.columns[columnName].assertDelegate(`${log.table.alias}.${columnName}`, rawValue);
        staticDefaultValue[columnName] = value;
    }
    const { table, entityIdentifier, latestOrder, tracked, doNotCopy, copy, dynamicDefaultValueDelegate, } = log;
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
exports.setStaticDefaultValue = setStaticDefaultValue;
/*
import * as o from "../../../index";

const entity = o.table(
    "entity",
    {
        entityId : o.bigint(),
    }
).setAutoIncrement(c => c.entityId);

const entityBanned = o.table(
    "entityBanned",
    {
        entityId : o.bigint(),
        updatedAt : o.dateTime(),
        banned : o.boolean(),
    }
).addCandidateKey(
    c => [c.entityId, c.updatedAt]
).addHasExplicitDefaultValue(
    c => [c.updatedAt]
);
const test = o.log(entityBanned)
    .setEntityIdentifier(c => [c.entityId])
    .setLatestOrder(c => c.updatedAt.desc())
    .setTracked(c => [c.banned])
    .setDoNotCopy(() => []);
declare const wtf : {
    readonly [columnName in {
        [columnName in Extract<keyof { banned : true }, string>] : (
            undefined extends { banned : true }[columnName] ?
            never :
            columnName
        )
    }[Extract<keyof { banned : true }, string>]] : (
        { banned : true }[columnName]
    )
};
const entityBannedLog = o.log(entityBanned)
    .setEntityIdentifier(c => [c.entityId])
    .setLatestOrder(c => c.updatedAt.desc())
    .setTracked(c => [c.banned])
    .setDoNotCopy(() => [])
    .setStaticDefaultValue<{banned:true}>({
        banned : true,
    })
    .staticDefaultValue;
declare const t: undefined extends true ? "y" : "n";*/ 
//# sourceMappingURL=set-static-default-value.js.map