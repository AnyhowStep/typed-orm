import * as o from "../main";
import {getDb} from "./db";
import * as tape from "tape";

tape(__filename, async (t) => {
    const db = await getDb();

    await db.select(() => [o.NOW.as("now")])
        .fetchOne()
        .then((row) => {
            t.assert(row.now instanceof Date, "Received 'now' value " + row.now);
        });
    await db.select(() => [o.NOW.as("now")])
        .aggregate(async (_row, original) => {
            return {
                ...original,
                aggregate0 : 0
            };
        })
        .fetchOne()
        .then((row) => {
            t.assert(row.now instanceof Date, "Received 'now' value " + row.now);
            t.deepEquals(row.aggregate0, 0, "expected 0");
        });
    await db.select(() => [o.NOW.as("now")])
        .aggregate(async (_row, original) => {
            return {
                ...original,
                aggregate0 : 0
            };
        })
        .aggregate(async (_row, original) => {
            return {
                ...original,
                aggregate1 : 1
            };
        })
        .fetchOne()
        .then((row) => {
            t.assert(row.now instanceof Date, "Received 'now' value " + row.now);
            t.deepEquals((row as any).aggregate0, undefined, "expected undefined");
            t.deepEquals(row.aggregate1, 1, "expected 1");
        });
    await db.select(() => [o.NOW.as("now")])
        .aggregate(async (row) => {
            return {
                ...row,
                aggregate0 : 0
            };
        })
        .aggregate(async (_row, original) => {
            return {
                ...original,
                aggregate1 : 1
            };
        })
        .aggregate(async (row) => {
            return {
                ...row,
                aggregate2 : 2
            };
        })
        .fetchOne()
        .then((row) => {
            t.assert(row.now instanceof Date, "Received 'now' value " + row.now);
            t.deepEquals((row as any).aggregate0, undefined, "expected undefined");
            t.deepEquals(row.aggregate1, 1, "expected 1");
            t.deepEquals(row.aggregate2, 2, "expected 2");
        });

    t.end();
});