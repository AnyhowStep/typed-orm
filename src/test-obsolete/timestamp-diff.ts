import * as o from "../main";
import {getDb} from "./db";
import * as tape from "tape";

tape(__filename, async (t) => {
    const db = await getDb();

    await db.select(() => [
        o.timestampDiff(
            o.NumericIntervalUnit.DAY,
            o.NOW,
            o.timestampAdd(
                o.NumericIntervalUnit.DAY,
                2,
                o.NOW
            )
        ).as("twoDaysFromNow"),
        o.timestampDiff(
            o.NumericIntervalUnit.DAY,
            o.NOW,
            o.timestampAdd(
                o.NumericIntervalUnit.HOUR,
                2 * 24,
                o.NOW
            )
        ).as("twoDaysFromNow2"),
        o.timestampDiff(
            o.NumericIntervalUnit.DAY,
            o.timestampAdd(
                o.NumericIntervalUnit.DAY,
                2,
                o.NOW
            ),
            o.NOW
        ).as("twoDaysFromNow3"),
    ])
        .fetchOne()
        .then((row) => {
            t.deepEquals(row.twoDaysFromNow, 2, "exactly two days");
            t.deepEquals(row.twoDaysFromNow2, 2, "exactly two days");
            t.deepEquals(row.twoDaysFromNow3, -2, "exactly two days");
        });

    t.end();
});