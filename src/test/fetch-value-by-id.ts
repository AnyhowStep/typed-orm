import * as o from "../main";
import * as sd from "schema-decorator";
import {getDb} from "./db";
import * as tape from "tape";

const app = o.table(
    "app",
    {
        appId : sd.naturalNumber(),
        name : sd.varChar(255)
    }
)
    .setAutoIncrement(c => c.appId)
    .setImmutable()
    .build();

tape(__filename, async (t) => {
    const db = await getDb();

    const inserted = await db.insertValue(app, {
        name : __filename
    })
        .execute();
    t.deepEquals(inserted.insertedRowCount, 1, "Expected one insertion");

    await db.fetchValueById(
        app,
        inserted.appId,
        c => c.name
    ).then((result) => {
        t.deepEquals(result, __filename);
    });
    //Select aliased expr
    await db.fetchValueById(
        app,
        inserted.appId,
        c => o.eq(c.name, __filename).as("isEqual")
    ).then((result) => {
        t.deepEquals(result, true);
    });


    const nonExistent = 0;
    //Select expr
    await db.fetchValueOrUndefinedById(
        app,
        nonExistent,
        c => o.eq(nonExistent, c.appId)
    ).then((result) => {
        t.deepEquals(result, undefined);
    });
    //Select aliased expr
    await db.fetchValueOrUndefinedById(
        app,
        nonExistent,
        c => o.eq(nonExistent, c.appId).as("isEqual")
    ).then((result) => {
        t.deepEquals(result, undefined);
    });
    //Select column
    await db.fetchValueOrUndefinedById(
        app,
        nonExistent,
        c => c.name
    ).then((result) => {
        t.deepEquals(result, undefined);
    });
    t.end();
});