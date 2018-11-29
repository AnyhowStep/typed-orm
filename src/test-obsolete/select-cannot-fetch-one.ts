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

function x (db : o.PooledDatabase) {
    return o.least(
        o.coalesce(
            db.from(user)
            .subQuery()
            .select(c => [
                c.appId,
            ]),
            0
        ),
        o.coalesce(
            db.from(userBanned)
            .subQuery()
            .select(c => [
                c.logId,
            ]),
            0
        )

    );
}

dbTest(__filename, async (t, db) => {
    db.from(user)
        .select(c => [
            c,
            x(db).as("x")
        ])
        //Attempting to call fetchOne() on this should fail, as expected
        //.fetchOne();
    t.end();
});