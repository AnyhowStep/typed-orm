import * as tape from "tape";
import * as o from "../../../../dist/src/main";
import {pool} from "../../pool";

tape(__filename, async (t) => {
    const result = await pool.acquire(async (connection) => {
        await connection.rawQuery("DROP TEMPORARY TABLE IF EXISTS insertSelectSrcTable");
        await connection.rawQuery(`
            CREATE TEMPORARY TABLE insertSelectSrcTable (
                value BIGINT NOT NULL
            )
        `);
        const insertSelectSrcTable = o.table(
            "insertSelectSrcTable",
            {
                value : o.bigint(),
            }
        );
        await o.insertInto(insertSelectSrcTable)
            .values(
                { value : 1n },
                { value : 1n },
                { value : 2n },
                { value : 3n },
                { value : 4n },
                { value : 8n },
                { value : 13n },
                { value : 21n },
            )
            .execute(connection);
        await connection.rawQuery("DROP TEMPORARY TABLE IF EXISTS insertSelectTable");
        await connection.rawQuery(`
            CREATE TEMPORARY TABLE insertSelectTable (
                value BIGINT NOT NULL,
                PRIMARY KEY (value)
            )
        `);
        const insertSelectTable = o.table(
            "insertSelectTable",
            {
                value : o.bigint(),
            }
        ).setPrimaryKey(c => [c.value]);
        const insertResult = await o.from(insertSelectSrcTable)
            .select(c => [c])
            .insertIgnoreInto(
                insertSelectTable,
                c => {
                    return {
                        value : c.value
                    };
                }
            )
            .execute(connection);
        t.deepEqual(
            insertResult,
            {
                fieldCount: 0,
                affectedRows: 7,
                insertId: 0n,
                serverStatus: 34,
                warningCount: 1,
                message: "&Records: 8  Duplicates: 1  Warnings: 1",
                protocol41: true,
                changedRows: 1
            }
        );
        return o.from(insertSelectTable)
            .select(c => [c])
            .orderBy(c => [
                c.value.asc()
            ])
            .fetchAll(connection);
    });
    t.deepEqual(result.length, 7);
    t.deepEqual(
        result,
        [
            { value : 1n },
            { value : 2n },
            { value : 3n },
            { value : 4n },
            { value : 8n },
            { value : 13n },
            { value : 21n },
        ]
    );

    t.end();
});
