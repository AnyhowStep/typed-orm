import * as o from "../main";
import * as sd from "schema-decorator";
import {getDb} from "./db";
import * as tape from "tape";

const logBase = o.table(
    "logBase",
    {
        updatedAt : sd.date()
    }
).setHasDefaultValue(c => [
    c.updatedAt
])
.setImmutable()
.build();

export const userLog = o.table(logBase)
    .withName("userLog")
    .addColumns({
        logId : sd.naturalNumber(),
        userId : sd.naturalNumber(),
    })
    .setAutoIncrement(c => c.logId)
    .setImmutable()
    .build();

const logData = o.log(userLog)
    .setEntityIdentifier(c => [c.userId])
    .setOrderByLatest(c => [
        [c.updatedAt, false],
        [c.logId, false]
    ])
    .build();

const userLogUser = o.table(
    "userLogUser",
    {
        userId : sd.naturalNumber()
    }
)
.setImmutable()
.build();

tape(__filename, async (t) => {
    const db = await getDb();
    try {
        const insertResult = await db.insertValueAndFetch(userLog, {
            userId : 1
        }).catch((err) => {
            console.error(err);
            throw new Error(err);
        });
        await db.from(userLogUser)
            .whereIsEqual(c => c.userId, 1)
            .select(() => [
                db.latestValueExpression(
                    logData,
                    userLogUser,
                    c => c.userLog.updatedAt,
                    () => null
                ).as("updatedAt")
            ])
            .fetchOne()
            .then((row) => {
                t.deepEquals(row.updatedAt, insertResult.updatedAt);
            });
    } catch (err) {
        console.error(err);
        throw new Error(err);
    }
    t.end();
});