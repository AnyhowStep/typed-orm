import * as o from "../../../../dist/src/main";

const entity = o.table(
    "entity",
    {
        entityId : o.bigint(),
    }
).addCandidateKey(
    c => [c.entityId]
);
const entityBanned = o.table(
    "entityBanned",
    {
        entityId : o.bigint(),
        updatedAt : o.dateTime(),
        banned : o.boolean(),
        someOtherEntityId : o.bigint(),
    }
).addCandidateKey(
    c => [c.entityId, c.updatedAt]
).addHasExplicitDefaultValue(
    c => [c.updatedAt]
);
export const entityBannedLog = o.log(entityBanned)
    .setEntity(entity)
    .setEntityIdentifier(c => [c.entityId])
    .setLatestOrder(c => c.updatedAt.desc())
    .setTracked(c => [c.banned])
    .setDoNotCopy(() => [])
    .setCopyDefaultsDelegate(() => {
        return Promise.resolve({
            someOtherEntityId : 1n,
        });
    })
    .setTrackedDefaults({
        banned : true,
    });
export const latestQuery = entityBannedLog.latest({
    entityId : 1n
});
declare const connection : o.IConnection;
export const fetchLatestOrUndefined = entityBannedLog.fetchLatestOrUndefined(
    connection,
    { entityId : 1n }
);