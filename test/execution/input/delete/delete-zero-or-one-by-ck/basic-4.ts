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
        const deleteResult = await o.DeleteUtil.deleteZeroOrOneByCk(
            connection,
            bigintTable,
            { keyA : "hello", keyB : "world" }
        );
        t.deepEqual(
            deleteResult,
            {
                fieldCount: 0,
                affectedRows: 1,
                insertId: 0,
                serverStatus: 3,
                warningCount: 0,
                message: "",
                protocol41: true,
                changedRows: 0,

                rawFoundRowCount : 1,
                rawDeletedRowCount : 1,

                deletedTableCount : 1,
                foundRowCount : 1,
                deletedRowCount : 1,
            }
        );
        return o.from(bigintTable)
            .select(c => [c])
            .orderBy(c => [c.value.asc()])
            .fetchAll(connection);
    });
    t.deepEqual(result.length, 1);
    t.deepEqual(
        result,
        [
            { keyA : "good", keyB : "night", value : 61n, },
        ]
    );

    t.end();
});