import * as o from "../main";
import * as sd from "schema-decorator";
import {getDb} from "./db";
import * as tape from "tape";

const user = o.table(
    "user",
    {
        appId : sd.naturalNumber(),
        userId : sd.varChar(256),
        generatedColumn : sd.varChar(32)
    }
)
    .addUniqueKey(c => [c.appId, c.userId])
    .setIsGenerated(c => [c.generatedColumn])
    .setImmutable()
    .build();

tape(__filename, async (t) => {
    const db = await getDb();
    await db.insertValueAndFetch(user, {
        appId : 1,
        userId : "user @ " + (new Date()).toString()
    }).then(console.log);
    t.end();
});