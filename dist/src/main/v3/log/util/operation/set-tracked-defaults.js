"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const log_1 = require("../../log");
function setTrackedDefaults(log, rawMap) {
    const trackedDefaults = {};
    for (let columnName of log.tracked) {
        const value = log.table.columns[columnName].assertDelegate(`${log.table.alias}.${columnName}`, rawMap[columnName]);
        trackedDefaults[columnName] = value;
    }
    const { table, entity, entityIdentifier, joinDeclaration, latestOrder, tracked, doNotCopy, copy, copyDefaultsDelegate, } = log;
    return new log_1.Log({
        table,
        entity,
        entityIdentifier,
        joinDeclaration,
        latestOrder,
        tracked,
        doNotCopy,
        copy,
        copyDefaultsDelegate,
        trackedDefaults,
    });
}
exports.setTrackedDefaults = setTrackedDefaults;
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
    .setTrackedDefaults<{banned:true}>({
        banned : true,
    })
    .staticDefaultValue;
declare const t: undefined extends true ? "y" : "n";*/ 
//# sourceMappingURL=set-tracked-defaults.js.map