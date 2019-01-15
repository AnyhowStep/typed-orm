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
                other VARCHAR(255),
                other2 VARCHAR(255)
            )
        `);
        const bigintTable = o.table(
            "bigintTable",
            {
                value : sd.string(),
                other : sd.string(),
                other2 : sd.string(),
            }
        ).addCandidateKey(c => [c.value]);
        await bigintTable.insert(connection, { value : "32", other : "hello", other2 : "goodbye" });
        await bigintTable.insert(connection, { value : "33", other : "world", other2 : "all" });
        return bigintTable.fetchOneBySk(
            connection,
            { value : "33", other : "DOES NOT EXIST" },
            c => [c.other2]
        );
    }).then(() => {
        t.fail("Should throw");
    }).catch(() => {
        t.pass();
    });

    t.end();
});
