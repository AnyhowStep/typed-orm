import * as o from "../main";
import {TypedEnv} from "@anyhowstep/typed-env";
import * as tape from "tape";

TypedEnv.Load(__dirname + "/test.env");

const db = new o.PooledDatabase({
    host     : TypedEnv.GetStringOrError("HOST"),
    database : TypedEnv.GetStringOrError("DATABASE"),
    user     : TypedEnv.GetStringOrError("USERNAME"),
    password : TypedEnv.GetStringOrError("PASSWORD"),
})

export async function getDb () {
    if (!db.isUtcOnly()) {
        await db.utcOnly();
    }
    return db;
}

export function dbTest (testName : string, callback : (t : tape.Test, db : o.PooledDatabase) => Promise<void>) {
    tape(testName, (t) => {
        callback(t, db)
            .then(() => {
                t.end();
            })
            .catch((err) => {
                t.fail(err);
                t.end();
            });
    })
}