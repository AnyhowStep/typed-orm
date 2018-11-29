import * as o from "../main";
import * as sd from "schema-decorator";
import {getDb} from "./db";
import * as tape from "tape";

const insertIgnore = o.table(
    "insertIgnore",
    {
        createdAt : sd.dateTime(),
    }
)
    .addUniqueKey(c => [c.createdAt])
    .setImmutable()
    .build();

tape(__filename, async (t) => {
    const db = await getDb();
    const now = new Date();
    const inserted = await db.insertValueAndFetch(insertIgnore, {
        createdAt : now
    });
    await db.deleteZeroOrOneByUniqueKey(insertIgnore, {
        createdAt : inserted.createdAt
    }).then((result) => {
        t.deepEquals(result.deletedRowCount, 1, "Expected to delete one row");
    });
    await db.deleteZeroOrOneByUniqueKey(insertIgnore, {
        createdAt : inserted.createdAt
    }).then((result) => {
        t.deepEquals(result.deletedRowCount, 0, "Expected to delete zero rows");
    });
    t.end();
});