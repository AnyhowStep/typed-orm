import * as o from "../main";
//import * as sd from "schema-decorator";
import {getDb} from "./db";
import * as tape from "tape";

tape(__filename, async (t) => {
    const db = await getDb();

    await db.select(() => [
        o.add(1, 2).as("sum")
    ])
        .fetchValue()
        .then((sum) => {
            t.deepEquals(sum, 3);
        });

    t.end();
});