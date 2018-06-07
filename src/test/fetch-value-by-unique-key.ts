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

    await db.insertValue(insertIgnore, {
        createdAt : o.NOW
    })
        .ignore()
        .execute()
        .then((result) => {
            t.deepEquals(result.insertedRowCount, 1, "Expected one insertion");
        });
    const latest = await db.from(insertIgnore)
        .select(c => [o.max(c.createdAt).as("max")])
        .fetchValue();
    console.log(latest);
    if (latest == undefined) {
        throw new Error(`latest must be a date, received null`);
    }

    await db.fetchValueByUniqueKey(
        insertIgnore,
        {
            createdAt : latest
        },
        c => c.createdAt
    ).then((result) => {
        console.log(result);
    });
    //Select expr
    await db.fetchValueByUniqueKey(
        insertIgnore,
        {
            createdAt : latest
        },
        c => o.eq(latest, c.createdAt)
    ).then((result) => {
        t.deepEquals(result, true);
    });
    //Select aliased expr
    await db.fetchValueByUniqueKey(
        insertIgnore,
        {
            createdAt : latest
        },
        c => o.eq(latest, c.createdAt).as("isEqual")
    ).then((result) => {
        t.deepEquals(result, true);
    });
    //Select column
    await db.fetchValueByUniqueKey(
        insertIgnore,
        {
            createdAt : latest
        },
        c => c.createdAt
    ).then((result) => {
        t.deepEquals(result, latest);
    });


    const nonExistent = new Date(new Date().getTime() + 1000);
    //Select expr
    await db.fetchValueOrUndefinedByUniqueKey(
        insertIgnore,
        {
            createdAt : nonExistent
        },
        c => o.eq(nonExistent, c.createdAt)
    ).then((result) => {
        t.deepEquals(result, undefined);
    });
    //Select aliased expr
    await db.fetchValueOrUndefinedByUniqueKey(
        insertIgnore,
        {
            createdAt : nonExistent
        },
        c => o.eq(nonExistent, c.createdAt).as("isEqual")
    ).then((result) => {
        t.deepEquals(result, undefined);
    });
    //Select column
    await db.fetchValueOrUndefinedByUniqueKey(
        insertIgnore,
        {
            createdAt : nonExistent
        },
        c => c.createdAt
    ).then((result) => {
        t.deepEquals(result, undefined);
    });
    t.end();
});