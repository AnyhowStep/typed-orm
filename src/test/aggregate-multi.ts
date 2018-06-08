import * as o from "../main";
import {getDb} from "./db";
import * as tape from "tape";

tape(__filename, async (t) => {
    const db = await getDb();

    await db.select(() => [o.NOW.as("now")])
        .fetchOne()
        .then((row) => {
            t.assert(row.now instanceof Date, "Received 'now' value " + row.now);
        });
    await db.select(() => [o.NOW.as("now")])
        .aggregate((row) => {
            return {
                ...row,
                aggregate0 : 0
            };
        })
        .fetchOne()
        .then((row) => {
            t.assert(row.now instanceof Date, "Received 'now' value " + row.now);
            t.deepEquals(row.aggregate0, 0, "expected 0");
        });
    await db.select(() => [o.NOW.as("now")])
        .aggregate((row) => {
            return {
                ...row,
                aggregate0 : 0
            };
        })
        .aggregate((row) => {
            return {
                ...row,
                aggregate1 : 1
            };
        })
        .fetchOne()
        .then((row) => {
            t.assert(row.now instanceof Date, "Received 'now' value " + row.now);
            t.deepEquals(row.aggregate0, 0, "expected 0");
            t.deepEquals(row.aggregate1, 1, "expected 1");
        });
    await db.select(() => [o.NOW.as("now")])
        .aggregate((row) => {
            return {
                ...row,
                aggregate0 : 0
            };
        })
        .aggregate((row) => {
            return {
                ...row,
                aggregate1 : 1
            };
        })
        .aggregate((row) => {
            return {
                ...row,
                aggregate2 : 2
            };
        })
        .fetchOne()
        .then((row) => {
            t.assert(row.now instanceof Date, "Received 'now' value " + row.now);
            t.deepEquals(row.aggregate0, 0, "expected 0");
            t.deepEquals(row.aggregate1, 1, "expected 1");
            t.deepEquals(row.aggregate2, 2, "expected 2");
        });

    t.end();
});

tape(__filename + "-unset aggregate at end", async (t) => {
    const db = await getDb();

    await db.select(() => [o.NOW.as("now")])
        .unsetAggregate()
        .fetchOne()
        .then((row) => {
            t.assert(row.now instanceof Date, "Received 'now' value " + row.now);
        });
    await db.select(() => [o.NOW.as("now")])
        .aggregate((row) => {
            return {
                ...row,
                aggregate0 : 0
            };
        })
        .unsetAggregate()
        .fetchOne()
        .then((row) => {
            t.assert(row.now instanceof Date, "Received 'now' value " + row.now);
            t.deepEquals((row as any).aggregate0, undefined, "expected undefined");
        });
    await db.select(() => [o.NOW.as("now")])
        .aggregate((row) => {
            return {
                ...row,
                aggregate0 : 0
            };
        })
        .aggregate((row) => {
            return {
                ...row,
                aggregate1 : 1
            };
        })
        .unsetAggregate()
        .fetchOne()
        .then((row) => {
            t.assert(row.now instanceof Date, "Received 'now' value " + row.now);
            t.deepEquals((row as any).aggregate0, undefined, "expected undefined");
            t.deepEquals((row as any).aggregate1, undefined, "expected undefined");
        });
    await db.select(() => [o.NOW.as("now")])
        .aggregate((row) => {
            return {
                ...row,
                aggregate0 : 0
            };
        })
        .aggregate((row) => {
            return {
                ...row,
                aggregate1 : 1
            };
        })
        .aggregate((row) => {
            return {
                ...row,
                aggregate2 : 2
            };
        })
        .unsetAggregate()
        .fetchOne()
        .then((row) => {
            t.assert(row.now instanceof Date, "Received 'now' value " + row.now);
            t.deepEquals((row as any).aggregate0, undefined, "expected undefined");
            t.deepEquals((row as any).aggregate1, undefined, "expected undefined");
            t.deepEquals((row as any).aggregate2, undefined, "expected undefined");
        });

    t.end();
});

tape(__filename + "-unset aggregate at middle", async (t) => {
    const db = await getDb();

    await db.select(() => [o.NOW.as("now")])
        .unsetAggregate()
        .aggregate((row) => {
            return {
                ...row,
                hello : "world",
            };
        })
        .fetchOne()
        .then((row) => {
            t.assert(row.now instanceof Date, "Received 'now' value " + row.now);
            t.deepEquals(row.hello, "world");
        });
    await db.select(() => [o.NOW.as("now")])
        .aggregate((row) => {
            return {
                ...row,
                aggregate0 : 0
            };
        })
        .unsetAggregate()
        .aggregate((row) => {
            return {
                ...row,
                hello : "world",
            };
        })
        .fetchOne()
        .then((row) => {
            t.assert(row.now instanceof Date, "Received 'now' value " + row.now);
            t.deepEquals((row as any).aggregate0, undefined, "expected undefined");
            t.deepEquals(row.hello, "world");
        });
    await db.select(() => [o.NOW.as("now")])
        .aggregate((row) => {
            return {
                ...row,
                aggregate0 : 0
            };
        })
        .aggregate((row) => {
            return {
                ...row,
                aggregate1 : 1
            };
        })
        .unsetAggregate()
        .aggregate((row) => {
            return {
                ...row,
                hello : "world",
            };
        })
        .fetchOne()
        .then((row) => {
            t.assert(row.now instanceof Date, "Received 'now' value " + row.now);
            t.deepEquals((row as any).aggregate0, undefined, "expected undefined");
            t.deepEquals((row as any).aggregate1, undefined, "expected undefined");
            t.deepEquals(row.hello, "world");
        });
    await db.select(() => [o.NOW.as("now")])
        .aggregate((row) => {
            return {
                ...row,
                aggregate0 : 0
            };
        })
        .aggregate((row) => {
            return {
                ...row,
                aggregate1 : 1
            };
        })
        .aggregate((row) => {
            return {
                ...row,
                aggregate2 : 2
            };
        })
        .unsetAggregate()
        .aggregate((row) => {
            return {
                ...row,
                hello : "world",
            };
        })
        .fetchOne()
        .then((row) => {
            t.assert(row.now instanceof Date, "Received 'now' value " + row.now);
            t.deepEquals((row as any).aggregate0, undefined, "expected undefined");
            t.deepEquals((row as any).aggregate1, undefined, "expected undefined");
            t.deepEquals((row as any).aggregate2, undefined, "expected undefined");
            t.deepEquals(row.hello, "world");
        });

    t.end();
});