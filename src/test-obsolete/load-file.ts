import * as o from "../main";
import {dbTest} from "./db";

dbTest(__filename, async (t, db) => {
    const value = await db.select(() => [
        o.loadFile("/var/lib/mysql-files/hello-world.txt").as("helloWorld")
    ]).fetchValue();
    t.deepEquals(value, new Buffer("hello world\n", "binary"));

    const value2 = await db.select(() => [
        o.loadFile("/var/lib/mysql-files/does-not-exist").as("doesNotExist")
    ]).fetchValue();
    t.deepEquals(value2, null);
});