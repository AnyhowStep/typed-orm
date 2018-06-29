import * as o from "../main";
//import * as sd from "schema-decorator";
import {getDb} from "./db";
import * as tape from "tape";

tape(__filename, async (t) => {
    const db = await getDb();

    await db.select(() => [
        o.sub(1, 2).as("diff")
    ])
        .fetchValue()
        .then((diff) => {
            t.deepEquals(diff, -1);
        });

    t.end();
});