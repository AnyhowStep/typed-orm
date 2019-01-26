import * as o from "../main";
//import * as sd from "schema-decorator";
import {getDb} from "./db";
import * as tape from "tape";

tape(__filename, async (t) => {
    const db = await getDb();

    await db.select(() => [
        o.ifTrue(true, "hello", "world").as("result")
    ])
        .fetchValue()
        .then((result) => {
            t.deepEquals(result, "hello");
        });
    await db.select(() => [
        o.ifTrue(false, "hello", "world").as("result")
    ])
        .fetchValue()
        .then((result) => {
            t.deepEquals(result, "world");
        });
    t.end();
});