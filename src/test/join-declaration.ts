import * as o from "../main";
import * as sd from "schema-decorator";
import {getDb} from "./db";
import * as tape from "tape";

const appSource = o.table(
    "appSource",
    {
        appId : sd.naturalNumber(),
        sourceId : sd.naturalNumber()
    }
).build();

const appSourceEnabled = o.table(
    "appSourceEnabled",
    {
        appId : sd.naturalNumber(),
        sourceId : sd.naturalNumber(),
        logId : sd.naturalNumber(),
        enabled : sd.numberToBoolean(),
    }
).build();

const app = o.table(
    "app",
    {
        appId : sd.naturalNumber(),
        name : sd.string(),
    }
).build();

const appSourceHasAppSourceEnabled = o.joinFrom(
    appSource,
    c => [
        c.appId,
        c.sourceId
    ]
).to(
    appSourceEnabled,
    c => [
        c.appId,
        c.sourceId
    ]
);
const appSourceEnabledBelongsToApp = o.joinFrom(
    appSourceEnabled,
    c => [
        c.appId
    ]
).to(
    app,
    c => [
        c.appId
    ]
);


const appSourceHasAppSourceEnabledUsing = o.joinUsing(
    appSource,
    appSourceEnabled,
    c => [
        c.appId,
        c.sourceId
    ]
);
const appSourceEnabledBelongsToAppUsing = o.joinUsing(
    appSourceEnabled,
    app,
    c => [
        c.appId
    ]
)


const crossJoinA = o.table(
    "crossJoinA",
    {
        columnA : sd.string(),
    }
)
    .setId(c => c.columnA)
    .setImmutable()
    .build();
const crossJoinB = o.table(
    "crossJoinB",
    {
        columnB : sd.string(),
    }
)
    .setId(c => c.columnB)
    .setImmutable()
    .build();


tape(__filename, async (t) => {
    const db = await getDb();

    await db.from(appSource)
        .useJoins(
            appSourceHasAppSourceEnabled
        )
        .selectAll()
        .fetchAll()
        .then((result) => {
            for (let row of result) {
                t.equal(row.appSource.appId, row.appSourceEnabled.appId);
                t.equal(row.appSource.sourceId, row.appSourceEnabled.sourceId);
            }
        });
    await db.from(appSource)
        .useJoins(
            appSourceHasAppSourceEnabled,
            appSourceEnabledBelongsToApp
        )
        .selectAll()
        .fetchAll()
        .then((result) => {
            for (let row of result) {
                t.equal(row.appSource.appId, row.appSourceEnabled.appId);
                t.equal(row.appSource.sourceId, row.appSourceEnabled.sourceId);
                t.equal(row.appSourceEnabled.appId, row.app.appId);
            }
        });
    await db.from(appSource)
        .joinUsing(
            appSourceEnabled,
            c => [
                c.appId,
                c.sourceId
            ]
        )
        .useJoins(
            appSourceEnabledBelongsToApp
        )
        .selectAll()
        .fetchAll()
        .then((result) => {
            for (let row of result) {
                t.equal(row.appSource.appId, row.appSourceEnabled.appId);
                t.equal(row.appSource.sourceId, row.appSourceEnabled.sourceId);
                t.equal(row.appSourceEnabled.appId, row.app.appId);
            }
        });
    await db.from(appSource)
        .useJoins(
            [o.JoinType.INNER, appSourceHasAppSourceEnabled],
            [o.JoinType.INNER, appSourceEnabledBelongsToApp]
        )
        .selectAll()
        .fetchAll()
        .then((result) => {
            for (let row of result) {
                t.equal(row.appSource.appId, row.appSourceEnabled.appId);
                t.equal(row.appSource.sourceId, row.appSourceEnabled.sourceId);
                t.equal(row.appSourceEnabled.appId, row.app.appId);
            }
        });
    await db.from(appSource)
        .useJoins(
            [o.JoinType.INNER, appSourceHasAppSourceEnabled],
            [o.JoinType.LEFT, appSourceEnabledBelongsToApp]
        )
        .selectAll()
        .fetchAll()
        .then((result) => {
            for (let row of result) {
                t.equal(row.appSource.appId, row.appSourceEnabled.appId);
                t.equal(row.appSource.sourceId, row.appSourceEnabled.sourceId);
                if (row.app != undefined) {
                    t.equal(row.appSourceEnabled.appId, row.app.appId);
                }
            }
        });

    const crossJoinACount = await db.from(crossJoinA).count();
    const crossJoinBCount = await db.from(crossJoinB).count();

    await db.from(crossJoinA)
        .useJoins(
            [o.JoinType.CROSS, crossJoinB]
        )
        .selectAll()
        .count()
        .then((result) => {
            t.deepEquals(result, crossJoinACount * crossJoinBCount);
        });

    await db.from(appSource)
        .useJoins(
            appSourceHasAppSourceEnabledUsing
        )
        .selectAll()
        .fetchAll()
        .then((result) => {
            for (let row of result) {
                t.equal(row.appSource.appId, row.appSourceEnabled.appId);
                t.equal(row.appSource.sourceId, row.appSourceEnabled.sourceId);
            }
        });
    await db.from(appSource)
        .useJoins(
            appSourceHasAppSourceEnabledUsing,
            appSourceEnabledBelongsToAppUsing
        )
        .selectAll()
        .fetchAll()
        .then((result) => {
            for (let row of result) {
                t.equal(row.appSource.appId, row.appSourceEnabled.appId);
                t.equal(row.appSource.sourceId, row.appSourceEnabled.sourceId);
                t.equal(row.appSourceEnabled.appId, row.app.appId);
            }
        });
    await db.from(appSource)
        .joinUsing(
            appSourceEnabled,
            c => [
                c.appId,
                c.sourceId
            ]
        )
        .useJoins(
            appSourceEnabledBelongsToAppUsing
        )
        .selectAll()
        .fetchAll()
        .then((result) => {
            for (let row of result) {
                t.equal(row.appSource.appId, row.appSourceEnabled.appId);
                t.equal(row.appSource.sourceId, row.appSourceEnabled.sourceId);
                t.equal(row.appSourceEnabled.appId, row.app.appId);
            }
        });
    await db.from(appSource)
        .useJoins(
            [o.JoinType.INNER, appSourceHasAppSourceEnabledUsing],
            [o.JoinType.INNER, appSourceEnabledBelongsToAppUsing]
        )
        .selectAll()
        .fetchAll()
        .then((result) => {
            for (let row of result) {
                t.equal(row.appSource.appId, row.appSourceEnabled.appId);
                t.equal(row.appSource.sourceId, row.appSourceEnabled.sourceId);
                t.equal(row.appSourceEnabled.appId, row.app.appId);
            }
        });
    await db.from(appSource)
        .useJoins(
            [o.JoinType.INNER, appSourceHasAppSourceEnabledUsing],
            [o.JoinType.LEFT, appSourceEnabledBelongsToAppUsing]
        )
        .selectAll()
        .fetchAll()
        .then((result) => {
            for (let row of result) {
                t.equal(row.appSource.appId, row.appSourceEnabled.appId);
                t.equal(row.appSource.sourceId, row.appSourceEnabled.sourceId);
                if (row.app != undefined) {
                    t.equal(row.appSourceEnabled.appId, row.app.appId);
                }
            }
        });

    t.end();
});