import * as o from "../main";
import {getDb} from "./db";
import * as tape from "tape";

tape(__filename, async (t) => {
    const db = await getDb();

    await db.select(() => [
        o.NOW.as("now"),
        o.timestampAdd(
            o.NumericIntervalUnit.DAY,
            2,
            o.NOW
        ).as("twoDaysFromNow"),
        o.timestampAdd(
            o.NumericIntervalUnit.HOUR,
            2,
            o.NOW
        ).as("twoHoursFromNow"),
        o.isBefore(
            o.NOW,
            o.timestampAdd(
                o.NumericIntervalUnit.HOUR,
                2,
                o.NOW
            )
        ).as("nowIsBeforeTwoHoursFromNow"),
        o.isBeforeOrEqual(
            o.NOW,
            o.timestampAdd(
                o.NumericIntervalUnit.HOUR,
                2,
                o.NOW
            )
        ).as("nowIsBeforeOrEqualTwoHoursFromNow"),
        o.isAfter(
            o.NOW,
            o.timestampAdd(
                o.NumericIntervalUnit.HOUR,
                2,
                o.NOW
            )
        ).as("nowIsAfterTwoHoursFromNow"),
        o.isAfterOrEqual(
            o.NOW,
            o.timestampAdd(
                o.NumericIntervalUnit.HOUR,
                2,
                o.NOW
            )
        ).as("nowIsAfterOrEqualTwoHoursFromNow"),
        o.eq(
            o.NOW,
            o.NOW
        ).as("nowIsEqualToNow"),
        o.isBefore(
            o.NOW,
            o.NOW
        ).as("nowIsBeforeNow"),
        o.isBeforeOrEqual(
            o.NOW,
            o.NOW
        ).as("nowIsBeforeOrEqualNow"),
        o.isAfter(
            o.NOW,
            o.NOW
        ).as("nowIsAfterNow"),
        o.isAfterOrEqual(
            o.NOW,
            o.NOW
        ).as("nowIsAfterOrEqualNow")
    ])
        .fetchOne()
        .then((row) => {
            t.deepEquals((row.twoHoursFromNow.getTime() - row.now.getTime()), 2 * 60 * 60 * 1000, "exactly two hours");
            t.deepEquals((row.twoDaysFromNow.getTime() - row.now.getTime()), 2 * 24 * 60 * 60 * 1000, "exactly two days");

            t.deepEquals(row.nowIsBeforeTwoHoursFromNow, true, "now is before two hours from now");
            t.deepEquals(row.nowIsBeforeOrEqualTwoHoursFromNow, true, "now is before or equal two hours from now");
            t.deepEquals(row.nowIsAfterTwoHoursFromNow, false, "now is NOT after two hours from now");
            t.deepEquals(row.nowIsAfterOrEqualTwoHoursFromNow, false, "now is NOT after or equal two hours from now");

            t.deepEquals(row.nowIsEqualToNow, true, "now is equal to now");
            t.deepEquals(row.nowIsBeforeNow, false, "now is NOT before now");
            t.deepEquals(row.nowIsBeforeOrEqualNow, true, "now is before or equal to now");
            t.deepEquals(row.nowIsAfterNow, false, "now is NOT after now");
            t.deepEquals(row.nowIsAfterOrEqualNow, true, "now is after or equal to now");

        });

    t.end();
});