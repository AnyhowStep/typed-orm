import * as sd from "schema-decorator";
import * as tape from "tape";
import * as o from "../../../../dist/src/main";
import {pool} from "../../pool";

tape(__filename, async (t) => {
    const result = await pool.acquire(async (connection) => {
        await connection.rawQuery("DROP TEMPORARY TABLE IF EXISTS bigintTable");
        await connection.rawQuery(`
            CREATE TEMPORARY TABLE bigintTable (
                \`key\` VARCHAR(255) NOT NULL,
                \`value\` BIGINT NOT NULL
            )
        `);
        const bigintTable = o.table(
            "bigintTable",
            {
                key : sd.string(),
                value : o.bigint(),
            }
        ).setId(c => c.key);
        const insertResult = await o.insertInto(bigintTable)
            .values(
                { key : "hello", value : 1337n, },
                { key : "world", value : 9001n, },
            )
            .execute(connection);
        t.deepEqual(
            insertResult,
            {
                fieldCount: 0,
                affectedRows: 2,
                insertId: 0n,
                serverStatus: 2,
                warningCount: 0,
                message: "&Records: 2  Duplicates: 0  Warnings: 0",
                protocol41: true,
                changedRows: 0,
                insertedRowCount : 2,
            }
        );
        return o.QueryUtil.fetchValueOrUndefinedByCk(
            connection,
            bigintTable,
            { key : "hello" },
            c => c.value
        );
    });
    t.deepEqual(result, 1337n);

    t.end();
});
