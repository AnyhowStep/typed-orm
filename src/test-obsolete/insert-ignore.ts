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
    const someDate = new Date(new Date().getTime() + 20000);
    await db.insertValue(insertIgnore, {
        createdAt : someDate
    })
        .ignore()
        .execute()
        .then((result) => {
            t.deepEquals(result.insertedRowCount, 1, "Expected one insertion");
        });
    await db.insertValue(insertIgnore, {
        createdAt : someDate
    })
        .ignore()
        .execute()
        .then((result) => {
            t.deepEquals(result.insertedRowCount, 0, "Expected zero insertions");
        });
    t.end();
});