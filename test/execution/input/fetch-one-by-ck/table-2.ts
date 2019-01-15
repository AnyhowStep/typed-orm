import * as sd from "schema-decorator";
import * as tape from "tape";
import * as o from "../../../../dist/src/main";
import {pool} from "../../pool";

tape(__filename, async (t) => {
    await pool.acquire(async (connection) => {
        await connection.rawQuery("DROP TEMPORARY TABLE IF EXISTS bigintTable");
        await connection.rawQuery(`
            CREATE TEMPORARY TABLE bigintTable (
                value BIGINT NOT NULL,
                other VARCHAR(255)
            )
        `);
        const bigintTable = o.table(
            "bigintTable",
            {
                value : sd.string(),
                other : sd.string()
            }
        ).addCandidateKey(c => [c.value]);
        await bigintTable.insert(connection, { value : "32", other : "hello" });
        await bigintTable.insert(connection, { value : "33", other : "world" });
        return bigintTable.fetchOneByCk(connection, { value : "999" });
    }).then(() => {
        t.fail("Should throw");
    }).catch(() => {
        t.pass();
    });

    t.end();
});
