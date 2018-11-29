import * as o from "../main";
import * as sd from "schema-decorator";
import {getDb} from "./db";
import * as tape from "tape";

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

    const crossJoinACount = await db.from(crossJoinA).count();
    const crossJoinBCount = await db.from(crossJoinB).count();

    await db.from(crossJoinA)
        .crossJoin(crossJoinB)
        .selectAll()
        .count()
        .then((result) => {
            t.deepEquals(result, crossJoinACount * crossJoinBCount);
        });

    t.end();
});