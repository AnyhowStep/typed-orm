import * as o from "../main";
import {getDb} from "./db";
import * as tape from "tape";

tape(__filename, async (t) => {
    const db = await getDb();

    await db.select(() => [
        o.negateIfFalse(
            true,
            o.exists(
                db.query()
            )
        ).as("exists")
    ])
        .fetchValue()
        .then((exists) => {
            t.deepEquals(exists, true);
        });
    await db.select(() => [
        o.negateIfFalse(
            false,
            o.exists(
                db.query()
            )
        ).as("exists")
    ])
        .fetchValue()
        .then((exists) => {
            t.deepEquals(exists, false);
        });
    t.end();
});