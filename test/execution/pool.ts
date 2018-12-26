import * as o from "../../dist/src/main";
import {TypedEnv} from "@anyhowstep/typed-env";

TypedEnv.Load(__dirname + "/db.env");

export const pool = new o.Pool({
    host      : TypedEnv.GetStringOrError("host"),
    database  : TypedEnv.GetStringOrError("database"),
    user      : TypedEnv.GetStringOrError("username"),
    password  : TypedEnv.GetStringOrError("password"),
    charset   : TypedEnv.GetStringOrError("charset") as o.CharSet,
});