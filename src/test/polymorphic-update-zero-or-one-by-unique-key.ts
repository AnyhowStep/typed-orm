import * as o from "../main";
import * as sd from "schema-decorator";
import {getDb} from "./db";
import * as tape from "tape";

const appKey = o.table(
    "appKey",
    {
        appKeyId : sd.naturalNumber(),
        appKeyTypeId : sd.naturalNumber(),
        key : sd.varChar(256),
        parentValue : sd.naturalNumber(),
    }
)
    .setAutoIncrement(c => c.appKeyId)
    .setHasDefaultValue(c => [c.parentValue])
    .setIsMutable(c => [c.key, c.parentValue])
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
    .setIsMutable(c => [c.referer])
    .build();
/*
const puacd : o.PolymorphicUpdateAssignmentCollectionDelegate<typeof browserAppKey>;
const prac : o.PolymorphicRawUpdateAssignmentCollection<typeof browserAppKey>;
const mcn : o.TableParentCollectionUtil.MutableColumnNames<typeof browserAppKey>;
const im : o.TableParentCollectionUtil.IsMutable<typeof browserAppKey, "referer">
*/
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
                    "-1a"
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
                referer : o.concat(
                    "updated referer of app key ",
                    c.appKey.appKeyId,
                    " @ ",
                    (new Date()).toString(),
                    "-1b"
                ),
                key : undefined,
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
                    "-2a"
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
                    "-2b"
                ),
                referer : undefined
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
                referer : c.browserAppKey.referer,
                key : undefined
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
        (c) => {
            return {
                key : c.appKey.key,
                referer : undefined
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
        t.equals(result.foundRowCount, -1);
        t.equals(result.updatedRowCount, 0);
        t.equals(result.exists, true);
    });
    await db.polymorphicUpdateZeroOrOneByUniqueKey(
        browserAppKey,
        {
            appKeyId : 1
        },
        () => {
            return {
                key : undefined,
                referer : undefined
            }
        }
    ).then((result) => {
        t.equals(result.foundRowCount, -1);
        t.equals(result.updatedRowCount, 0);
        t.equals(result.exists, true);
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

tape(__filename + "-with parent constraint", async (t) => {
    const db = await getDb();
    await db.polymorphicUpdateZeroOrOneByUniqueKey(
        browserAppKey,
        {
            parentValue : 99,
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
            parentValue : 99,
            appKeyId : 1
        },
        (c) => {
            return {
                referer : o.concat(
                    "updated referer of app key ",
                    c.appKey.appKeyId,
                    " @ ",
                    (new Date()).toString(),
                    "-1a"
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
            parentValue : 99,
            appKeyId : 1
        },
        (c) => {
            return {
                referer : o.concat(
                    "updated referer of app key ",
                    c.appKey.appKeyId,
                    " @ ",
                    (new Date()).toString(),
                    "-1b"
                ),
                key : undefined,
            }
        }
    ).then((result) => {
        t.equals(result.foundRowCount, 1);
        t.equals(result.updatedRowCount, 1);
    });
    await db.polymorphicUpdateZeroOrOneByUniqueKey(
        browserAppKey,
        {
            parentValue : 99,
            appKeyId : 1
        },
        (c) => {
            return {
                key : o.concat(
                    "updated key of app key ",
                    c.appKey.appKeyId,
                    " @ ",
                    (new Date()).toString(),
                    "-2a"
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
            parentValue : 99,
            appKeyId : 1
        },
        (c) => {
            return {
                key : o.concat(
                    "updated key of app key ",
                    c.appKey.appKeyId,
                    " @ ",
                    (new Date()).toString(),
                    "-2b"
                ),
                referer : undefined
            }
        }
    ).then((result) => {
        t.equals(result.foundRowCount, 1);
        t.equals(result.updatedRowCount, 1);
    });
    await db.polymorphicUpdateZeroOrOneByUniqueKey(
        browserAppKey,
        {
            parentValue : 99,
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
            parentValue : 99,
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
            parentValue : 99,
            appKeyId : 1
        },
        (c) => {
            return {
                referer : c.browserAppKey.referer,
                key : undefined
            }
        }
    ).then((result) => {
        t.equals(result.foundRowCount, 1);
        t.equals(result.updatedRowCount, 0);
    });
    await db.polymorphicUpdateZeroOrOneByUniqueKey(
        browserAppKey,
        {
            parentValue : 99,
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
            parentValue : 99,
            appKeyId : 1
        },
        (c) => {
            return {
                key : c.appKey.key,
                referer : undefined
            }
        }
    ).then((result) => {
        t.equals(result.foundRowCount, 1);
        t.equals(result.updatedRowCount, 0);
    });
    await db.polymorphicUpdateZeroOrOneByUniqueKey(
        browserAppKey,
        {
            parentValue : 99,
            appKeyId : 1
        },
        () => {
            return {}
        }
    ).then((result) => {
        t.equals(result.foundRowCount, -1);
        t.equals(result.updatedRowCount, 0);
        t.equals(result.exists, true);
    });
    await db.polymorphicUpdateZeroOrOneByUniqueKey(
        browserAppKey,
        {
            parentValue : 99,
            appKeyId : 1
        },
        () => {
            return {
                key : undefined,
                referer : undefined
            }
        }
    ).then((result) => {
        t.equals(result.foundRowCount, -1);
        t.equals(result.updatedRowCount, 0);
        t.equals(result.exists, true);
    });
    await db.polymorphicUpdateZeroOrOneByUniqueKey(
        browserAppKey,
        {
            parentValue : 99,
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
    await db.polymorphicUpdateZeroOrOneByUniqueKey(
        browserAppKey,
        {
            parentValue : 9001,
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
        t.equals(result.foundRowCount, 0);
        t.equals(result.updatedRowCount, 0);
    });
    t.end();
});