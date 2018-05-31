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

tape(__filename, async (t) => {
    const db = await getDb();
    await db.polymorphicUpdateZeroOrOneByUniqueKey(
        browserAppKey,
        {
            appKeyId : 1
        },
        (c) => {
            return {
                referer : o.concat(
                    "updated referer of app key ",
                    c.appKey.appKeyId,
                    " @ ",
                    (new Date()).toString()
                ),
                key : o.concat(
                    "updated key of app key ",
                    c.appKey.appKeyId,
                    " @ ",
                    (new Date()).toString()
                )
            }
        }
    ).then((result) => {
        t.equals(result.foundRowCount, 2);
        t.equals(result.updatedRowCount, 2);
    });
    await db.polymorphicUpdateZeroOrOneByUniqueKey(
        browserAppKey,
        {
            appKeyId : 1
        },
        (c) => {
            return {
                referer : o.concat(
                    "updated referer of app key ",
                    c.appKey.appKeyId,
                    " @ ",
                    (new Date()).toString(),
                    "-1"
                )
            }
        }
    ).then((result) => {
        t.equals(result.foundRowCount, 1);
        t.equals(result.updatedRowCount, 1);
    });
    await db.polymorphicUpdateZeroOrOneByUniqueKey(
        browserAppKey,
        {
            appKeyId : 1
        },
        (c) => {
            return {
                key : o.concat(
                    "updated key of app key ",
                    c.appKey.appKeyId,
                    " @ ",
                    (new Date()).toString(),
                    "-2"
                )
            }
        }
    ).then((result) => {
        t.equals(result.foundRowCount, 1);
        t.equals(result.updatedRowCount, 1);
    });
    await db.polymorphicUpdateZeroOrOneByUniqueKey(
        browserAppKey,
        {
            appKeyId : 1
        },
        (c) => {
            return {
                key : c.appKey.key,
                referer : c.browserAppKey.referer
            }
        }
    ).then((result) => {
        t.equals(result.foundRowCount, 2);
        t.equals(result.updatedRowCount, 0);
    });
    await db.polymorphicUpdateZeroOrOneByUniqueKey(
        browserAppKey,
        {
            appKeyId : 1
        },
        (c) => {
            return {
                referer : c.browserAppKey.referer
            }
        }
    ).then((result) => {
        t.equals(result.foundRowCount, 1);
        t.equals(result.updatedRowCount, 0);
    });
    await db.polymorphicUpdateZeroOrOneByUniqueKey(
        browserAppKey,
        {
            appKeyId : 1
        },
        (c) => {
            return {
                key : c.appKey.key
            }
        }
    ).then((result) => {
        t.equals(result.foundRowCount, 1);
        t.equals(result.updatedRowCount, 0);
    });
    await db.polymorphicUpdateZeroOrOneByUniqueKey(
        browserAppKey,
        {
            appKeyId : 1
        },
        () => {
            return {}
        }
    ).then((result) => {
        t.equals(result.foundRowCount, 1);
        t.equals(result.updatedRowCount, 0);
    });
    await db.polymorphicUpdateZeroOrOneByUniqueKey(
        browserAppKey,
        {
            appKeyId : 999999999999
        },
        (c) => {
            return {
                referer : o.concat(
                    "updated referer of app key ",
                    c.appKey.appKeyId,
                    " @ ",
                    (new Date()).toString()
                ),
                key : o.concat(
                    "updated key of app key ",
                    c.appKey.appKeyId,
                    " @ ",
                    (new Date()).toString()
                )
            }
        }
    ).then((result) => {
        t.equals(result.foundRowCount, 0);
        t.equals(result.updatedRowCount, 0);
    });
    t.end();
});