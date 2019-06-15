import * as sd from "type-mapping";
import * as tape from "tape";
import * as o from "../../../../../dist/src/main";
import {pool} from "../../../pool";

tape(__filename, async (t) => {
    const result = await pool.acquire(async (connection) => {
        await connection.rawQuery("DROP TEMPORARY TABLE IF EXISTS bigintTable");
        await connection.rawQuery(`
            CREATE TEMPORARY TABLE bigintTable (
                keyA VARCHAR(64) NOT NULL,
                keyB VARCHAR(64) NOT NULL,
                value BIGINT NOT NULL,
                UNIQUE KEY (keyA, keyB)
            )
        `);
        const bigintTable = o.table(
            "bigintTable",
            {
                keyA : sd.string(),
                keyB : sd.string(),
                value : o.bigint(),
            }
        ).addCandidateKey(c => [c.keyA, c.keyB]);
        const insertResult = await o.insertInto(bigintTable)
            .values(
                { keyA : "hello", keyB : "world", value : 60n, },
                { keyA : "good", keyB : "night", value : 61n, }
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
        return o.UpdateUtil.updateAndFetchZeroOrOneByCk(
            connection,
            bigintTable,
            { keyA : "does not", keyB : "exist" },
            () => {
                return {
                    value : 88n,
                };
            }
        );
    });

    t.deepEqual(
        result,
        {
            fieldCount: 0,
            affectedRows: 0,
            insertId: 0,
            serverStatus: 3,
            warningCount: 0,
            message: "(Rows matched: 0  Changed: 0  Warnings: 0",
            protocol41: true,
            changedRows: 0,

            rawFoundRowCount : 0,
            rawUpdatedRowCount : 0,

            updatedTableCount : 1,
            foundRowCount : 0,
            updatedRowCount : 0,
            row : undefined,
        }
    );

    t.end();
});