import * as o from "../main";
import {TypedEnv} from "@anyhowstep/typed-env";

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