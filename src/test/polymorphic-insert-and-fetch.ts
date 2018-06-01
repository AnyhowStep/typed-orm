import * as o from "../main";
import * as sd from "schema-decorator";
import {getDb} from "./db";
import * as tape from "tape";

const appKey = o.table(
    "appKey",
    {
        appKeyId : sd.naturalNumber(),
        appKeyTypeId : sd.naturalNumber(),
        key : sd.varChar(256)
    }
)
    .setAutoIncrement(c => c.appKeyId)
    .setImmutable()
    .build();
const browserAppKey = o.table(
    "browserAppKey",
    {
        appKeyId : sd.naturalNumber(),
        appKeyTypeId : sd.oneOf(1),
        referer : sd.nullable(sd.varChar(256))
    }
)
    .setId(c => c.appKeyId)
    .setIsGenerated(c => [c.appKeyTypeId])
    .addParent(appKey)
    .build();
/*
const rcn : o.TableParentCollectionUtil.RequiredColumnNames<typeof browserAppKey>;
const ocn : o.TableParentCollectionUtil.OptionalColumnNames<typeof browserAppKey>;
*/
tape(__filename, async (t) => {
    const db = await getDb();
    const expectedKey = "Created Key @ " + (new Date()).toString();
    const expectedReferer = "Created Referer @ " + (new Date()).toString();
    await db.polymorphicInsertValueAndFetch(browserAppKey, {
        key : expectedKey,
        referer : expectedReferer
    }).then((result) => {
        t.equals(result.key, expectedKey);
        t.equals(result.referer, expectedReferer);
    });
    await db.polymorphicInsertValueAndFetch(browserAppKey, {
        key : expectedKey + "-1",
        referer : null
    }).then((result) => {
        t.equals(result.key, expectedKey + "-1");
        t.equals(result.referer, null);
    });
    t.end();
});