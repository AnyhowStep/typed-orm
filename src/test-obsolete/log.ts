import * as o from "../main";
import * as sd from "schema-decorator";
import {dbTest} from "./db";

const user = o.table(
    "user",
    {
        appId : sd.naturalNumber(),
        userId : sd.varChar(256),
        generatedColumn : sd.varChar(32),
        createdAt : sd.date(),
    }
)
    .addUniqueKey(c => [c.appId, c.userId])
    .setIsGenerated(c => [c.generatedColumn])
    .setHasDefaultValue(c => [c.createdAt])
    .setImmutable()
    .build();

const userBanned = o.table(
    "userBanned",
    {
        logId : sd.naturalNumber(),
        appId : sd.naturalNumber(),
        userId : sd.varChar(256),
        banned : sd.numberToBoolean(),
        loggedAt : sd.date(),
    }
)
    .setAutoIncrement(c => c.logId)
    .setImmutable()
    .setHasDefaultValue(c => [c.loggedAt])
    .build();

const userBannedLog = o.log(userBanned)
    .setEntityIdentifier(c => [c.appId, c.userId])
    .setIsTrackable(c => [c.banned])
    .setDefaultRow(async (entityIdentifier, db) => {
        return {
            logId : 0,
            ...entityIdentifier,
            banned : false,
            loggedAt : await db.from(user)
                .where(() => o.toEqualityCondition(
                    user,
                    entityIdentifier
                ))
                .select(c => [c.createdAt])
                .fetchValue(),
        };
    })
    .setOrderByLatest(c => [
        [c.loggedAt, false],
        [c.logId, false],
    ])
    .build();

dbTest(__filename, async (t, db) => {
    const insertedUser = await db.insertValueAndFetch(user, {
        appId : 1,
        userId : "Created @ " + (new Date()),
    });
    t.deepEquals(
        await o.LogDataUtil.fetchLatestOrUndefined(
            db,
            userBannedLog,
            insertedUser
        ),
        undefined,
        "latest log of new entity is undefined"
    );
    t.deepEquals(
        await o.LogDataUtil.fetchLatestOrDefault(
            db,
            userBannedLog,
            insertedUser
        ),
        await userBannedLog.defaultRowDelegate(insertedUser, db),
        "latest log of new entity is default"
    );
    try {
        await o.LogDataUtil.fetchLatestOrError(
            db,
            userBannedLog,
            insertedUser
        );
        t.fail("Expected fetching latest log of new entity to throw an error");
    } catch (err) {
        t.pass(err);
    }


    t.deepEquals(
        await o.LogDataUtil.insertIfDifferentAndFetch(
            db,
            userBannedLog,
            insertedUser,
            {
                //Inserting no changes
            }
        ),
        {
            latest : await userBannedLog.defaultRowDelegate(insertedUser, db),
            wasInserted : false,
        },
        "expected insertion to fail"
    );
    t.deepEquals(
        await o.LogDataUtil.fetchLatestOrUndefined(
            db,
            userBannedLog,
            insertedUser
        ),
        undefined,
        "latest log of new entity is undefined"
    );
    t.deepEquals(
        await o.LogDataUtil.fetchLatestOrDefault(
            db,
            userBannedLog,
            insertedUser
        ),
        await userBannedLog.defaultRowDelegate(insertedUser, db),
        "latest log of new entity is default"
    );
    try {
        await o.LogDataUtil.fetchLatestOrError(
            db,
            userBannedLog,
            insertedUser
        );
        t.fail("Expected fetching latest log of new entity to throw an error");
    } catch (err) {
        t.pass(err);
    }

    t.deepEquals(
        await o.LogDataUtil.insertIfDifferentAndFetch(
            db,
            userBannedLog,
            insertedUser,
            {
                //Shouldn't trigger any insertion because the default is `false`
                banned : false,
            }
        ),
        {
            latest : await userBannedLog.defaultRowDelegate(insertedUser, db),
            wasInserted : false,
        },
        "expected insertion to fail"
    );
    t.deepEquals(
        await o.LogDataUtil.fetchLatestOrUndefined(
            db,
            userBannedLog,
            insertedUser
        ),
        undefined,
        "latest log of new entity is undefined"
    );
    t.deepEquals(
        await o.LogDataUtil.fetchLatestOrDefault(
            db,
            userBannedLog,
            insertedUser
        ),
        await userBannedLog.defaultRowDelegate(insertedUser, db),
        "latest log of new entity is default"
    );
    try {
        await o.LogDataUtil.fetchLatestOrError(
            db,
            userBannedLog,
            insertedUser
        );
        t.fail("Expected fetching latest log of new entity to throw an error");
    } catch (err) {
        t.pass(err);
    }

    {
        const logInsertResult = await o.LogDataUtil.insertIfDifferentAndFetch(
            db,
            userBannedLog,
            insertedUser,
            {
                //Should trigger an insertion because the default is `false`
                banned : true,
            }
        );
        t.deepEquals(
            logInsertResult.wasInserted,
            true,
            "change inserted"
        );
        t.deepEquals(
            logInsertResult.latest.banned,
            true,
            "user is now banned"
        );
        t.deepEquals(
            await o.LogDataUtil.fetchLatestOrUndefined(
                db,
                userBannedLog,
                insertedUser
            ),
            logInsertResult.latest,
            "latest log is not undefined"
        );
        t.deepEquals(
            await o.LogDataUtil.fetchLatestOrDefault(
                db,
                userBannedLog,
                insertedUser
            ),
            logInsertResult.latest,
            "latest log of new entity is not default"
        );
        t.deepEquals(
            await o.LogDataUtil.fetchLatestOrError(
                db,
                userBannedLog,
                insertedUser
            ),
            logInsertResult.latest,
            "latest log exists"
        );
        t.deepEquals(
            await o.LogDataUtil.insertIfDifferentAndFetch(
                db,
                userBannedLog,
                insertedUser,
                {
                    banned : true,
                }
            ),
            {
                latest : logInsertResult.latest,
                wasInserted : false,
            },
            "expected insertion to fail"
        );
    }
    {
        const logInsertResult = await o.LogDataUtil.insertIfDifferentAndFetch(
            db,
            userBannedLog,
            insertedUser,
            {
                banned : false,
            }
        );
        t.deepEquals(
            logInsertResult.wasInserted,
            true,
            "change inserted"
        );
        t.deepEquals(
            logInsertResult.latest.banned,
            false,
            "user is now unbanned"
        );
        t.deepEquals(
            await o.LogDataUtil.fetchLatestOrUndefined(
                db,
                userBannedLog,
                insertedUser
            ),
            logInsertResult.latest,
            "latest log is not undefined"
        );
        t.deepEquals(
            await o.LogDataUtil.fetchLatestOrDefault(
                db,
                userBannedLog,
                insertedUser
            ),
            logInsertResult.latest,
            "latest log of new entity is not default"
        );
        t.deepEquals(
            await o.LogDataUtil.fetchLatestOrError(
                db,
                userBannedLog,
                insertedUser
            ),
            logInsertResult.latest,
            "latest log exists"
        );
    }
});