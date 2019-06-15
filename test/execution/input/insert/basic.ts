import * as sd from "type-mapping";
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
                    sd.finiteNumberToFiniteNumberString(),
                    sd.string()
                ),
            }
        );
        const insertResult = await o.insertInto(bigintTable)
            .values({
                value : "32"
            })
            .execute(connection);
        t.deepEqual(
            insertResult,
            {
                fieldCount: 0,
                affectedRows: 1,
                insertId: 0n,
                serverStatus: 2,
                warningCount: 0,
                message: "",
                protocol41: true,
                changedRows: 0,
                insertedRowCount : 1,
            }
        );
        return o.from(bigintTable)
            .select(c => [c])
            .fetchAll(connection);
    });
    t.deepEqual(result.length, 1);
    t.deepEqual(result[0].value, "32");

    t.end();
});
