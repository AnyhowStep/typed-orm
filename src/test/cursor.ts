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

tape(__filename, async (t) => {
    const db = await getDb();

    for await (let row of (
        db.from(appSource)
            .joinUsing(
                appSourceEnabled,
                c => [
                    c.appId,
                    c.sourceId
                ]
            )
            .selectAll()
            .cursor()
    )) {
        t.equal(row.appSource.appId, row.appSourceEnabled.appId);
        t.equal(row.appSource.sourceId, row.appSourceEnabled.sourceId);
    }
    for await (let row of (
        db.from(appSource)
            .joinUsing(
                appSourceEnabled,
                c => [
                    c.appId,
                    c.sourceId
                ]
            )
            .joinUsing(
                app,
                c => [
                    c.appSourceEnabled.appId
                ]
            )
            .selectAll()
            .cursor()
    )) {
        t.equal(row.appSource.appId, row.appSourceEnabled.appId);
        t.equal(row.appSource.sourceId, row.appSourceEnabled.sourceId);
        t.equal(row.appSourceEnabled.appId, row.app.appId);
    }
    for await (let row of (
        db.from(appSource)
            .joinUsing(
                appSourceEnabled,
                c => [
                    c.appId,
                    c.sourceId
                ]
            )
            .leftJoinUsing(
                app,
                c => [
                    c.appSourceEnabled.appId
                ]
            )
            .selectAll()
            .cursor()
    )) {
        t.equal(row.appSource.appId, row.appSourceEnabled.appId);
        t.equal(row.appSource.sourceId, row.appSourceEnabled.sourceId);
        if (row.app != undefined) {
            t.equal(row.appSourceEnabled.appId, row.app.appId);
        }
    }

    t.end();
});