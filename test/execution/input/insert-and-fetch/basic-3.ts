import * as sd from "schema-decorator";
import * as tape from "tape";
import * as o from "../../../../dist/src/main";
import {pool} from "../../pool";

tape(__filename, async (t) => {
    const result = await pool.acquire(async (connection) => {
        await connection.rawQuery("DROP TEMPORARY TABLE IF EXISTS bigintTable");
        await connection.rawQuery(`
            CREATE TEMPORARY TABLE bigintTable (
                value BIGINT NULL
            )
        `);
        const bigintTable = o.table(
            "bigintTable",
            {
                value : sd.nullable(sd.string()),
            }
        ).addCandidateKey(c => [c.value]);
        return o.InsertUtil.insertAndFetch(
            connection,
            bigintTable,
            {
                value : null
            }
        );
    });
    t.deepEqual(result, { value : null });

    t.end();
});
