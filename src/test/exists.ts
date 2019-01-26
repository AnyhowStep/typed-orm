import * as o from "../main";
import * as sd from "schema-decorator";
import {getDb} from "./db";
import * as tape from "tape";

const insertIgnore = o.table(
    "insertIgnore",
    {
        createdAt : sd.date(),
    }
)
    .addUniqueKey(c => [c.createdAt])
    .setImmutable()
    .build();

tape(__filename, async (t) => {
    const db = await getDb();

    await db.select(() => [
        o.exists(
            db.query()
        ).as("exists")
    ])
        .fetchValue()
        .then((exists) => {
            t.deepEquals(exists, true);
        });

    await db.select(() => [
        o.exists(db.from(insertIgnore)).as("exists")
    ])
        .fetchValue()
        .then((exists) => {
            t.deepEquals(exists, true);
        });

    await db.select(() => [
        o.exists(db.from(insertIgnore).where(() => o.FALSE)).as("exists")
    ])
        .fetchValue()
        .then((exists) => {
            t.deepEquals(exists, false);
        });
    t.end();
});