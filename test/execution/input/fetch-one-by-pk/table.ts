import * as sd from "schema-decorator";
import * as tape from "tape";
import * as o from "../../../../dist/src/main";
import {pool} from "../../pool";

tape(__filename, async (t) => {
    const result = await pool.acquire(async (connection) => {
        await connection.rawQuery("DROP TEMPORARY TABLE IF EXISTS bigintTable");
        await connection.rawQuery(`
            CREATE TEMPORARY TABLE bigintTable (
                value BIGINT NOT NULL
            )
        `);
        const bigintTable = o.table(
            "bigintTable",
            {
                value : sd.or(
                    sd.numberToString(),
                    sd.string()
                ),
            }
        ).setPrimaryKey(c => [c.value]);
        await bigintTable.insert(connection, { value : "32" });
        await bigintTable.insert(connection, { value : "33" });
        return bigintTable.fetchOneByPk(connection, { value : "32" });
    });
    t.deepEqual(result, { value : "32" });

    t.end();
});
