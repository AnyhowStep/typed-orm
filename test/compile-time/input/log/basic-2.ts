import * as o from "../../../../dist/src/main";

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
export const entityBannedLog = o.log(entityBanned)
    .setEntityIdentifier(c => [c.entityId])
    .setLatestOrder(c => c.updatedAt.desc())
    .setTracked(c => [c.banned])
    .setDoNotCopy(() => [])
    .setStaticDefaultValue({
        banned : true,
    })
    .setDynamicDefaultValueDelegate(() => {
        return Promise.resolve({});
    });
export const latestQuery = entityBannedLog.latestQuery({
    entityId : 1n
});
declare const connection : o.IConnection;
export const fetchLatestOrUndefined = entityBannedLog.fetchLatestOrUndefined(
    { entityId : 1n },
    connection
);