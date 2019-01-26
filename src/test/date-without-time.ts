import * as o from "../main";
import * as sd from "schema-decorator";
import {getDb} from "./db";
import * as tape from "tape";

const dateTest = o.table(
    "dateTest",
    {
        date : sd.date(),
    }
)
    .addUniqueKey(c => [c.date])
    .setImmutable()
    .build();

tape(__filename, async (t) => {
    const db = await getDb();

    db.insertValue(
        dateTest,
        {
            date : "2018-09-24" as any
        }
    ).ignore().execute();

    const result = await db.from(dateTest)
        .selectAll()
        .fetchValueArray();
    console.log(result);
    t.end();
});