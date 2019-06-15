import * as sd from "type-mapping";
import * as tape from "tape";
import * as o from "../../../../dist/src/main";
import {pool} from "../../pool";

tape(__filename, async (t) => {
    const now = new Date();
    const result = await pool.acquire(async (connection) => {
        await connection.rawQuery("DROP TEMPORARY TABLE IF EXISTS dateTable3");
        await connection.rawQuery(`
            CREATE TEMPORARY TABLE dateTable3 (
                value DATETIME(3) NOT NULL,
                UNIQUE (value)
            )
        `);
        const dateTable3 = o.table(
            "dateTable3",
            {
                value : sd.mysql.dateTime(3),
            }
        ).addCandidateKey(c => [c.value]);
        return o.insertInto(dateTable3)
            .values({
                value : now,
            })
            .executeAndFetch(connection);
    });
    t.deepEqual(result, {
        value : now
    });

    t.end();
});
