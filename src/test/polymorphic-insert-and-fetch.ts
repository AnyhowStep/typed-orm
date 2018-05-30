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
        referer : sd.varChar(256)
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
async function aggregationQuery () {
    const db = await getDb();
    return db.from(appKey)
        .joinUsing(browserAppKey, c => [c.appKeyId])
        .selectAll()
        .aggregate((row) => {
            return {
                ...row.appKey,
                ...row.browserAppKey,
            }
        })
}
tape(__filename, async (t) => {
    const db = await getDb();
    await db.polymorphicInsertValueAndFetch(browserAppKey, {
        key : "Created @ " + (new Date()).toString(),
        referer : "some referer"
    }).then(console.log);
    const x = aggregationQuery().then(q => {
        return q.fetchOne()
    })
    t.end();
});