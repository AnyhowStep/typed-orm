import * as tape from "tape";
import * as o from "../../../../dist/src/main";
import {pool} from "../../pool";

tape(__filename, async (t) => {
    const result = await pool.acquire(async (connection) => {
        await connection.rawQuery("DROP TEMPORARY TABLE IF EXISTS updateA");
        await connection.rawQuery(`
            CREATE TEMPORARY TABLE updateA (
                value BIGINT NOT NULL
            )
        `);
        const updateA = o.table(
            "updateA",
            {
                value : o.bigint(),
            }
        ).setPrimaryKey(c => [c.value]);
        const insertResult = await o.insertInto(updateA)
            .values(
                { value : 32n, },
                { value : 33n, }
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
        await connection.rawQuery("DROP TEMPORARY TABLE IF EXISTS updateB");
        await connection.rawQuery(`
            CREATE TEMPORARY TABLE updateB (
                value BIGINT NOT NULL
            )
        `);
        const updateB = o.table(
            "updateB",
            {
                value : o.bigint(),
            }
        ).setPrimaryKey(c => [c.value]);
        const insertResult2 = await o.insertInto(updateB)
            .values(
                { value : 33n, },
                { value : 34n, }
            )
            .execute(connection);
        t.deepEqual(
            insertResult2,
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
        const updateResult = await o.from(updateA)
            .innerJoinPk(
                t => t.updateA,
                updateB
            )
            .whereEq(c => c.updateA.value, 33n)
            .set(
                c => {
                    return {
                        updateA : {
                            value : o.bigIntAdd(c.updateA.value, 10n)
                        },
                        updateB : {
                            value : o.bigIntAdd(c.updateB.value, 100n)
                        }
                    }
                }
            )
            .execute(connection);
        t.deepEqual(
            updateResult,
            {
                fieldCount: 0,
                affectedRows: 2,
                insertId: 0,
                serverStatus: 34,
                warningCount: 0,
                message: "(Rows matched: 2  Changed: 2  Warnings: 0",
                protocol41: true,
                changedRows: 2,

                rawFoundRowCount : 2,
                rawUpdatedRowCount : 2,

                updatedTableCount : 2,
                foundRowCount : 1,
            }
        );
        return {
            updateA : await o.from(updateA)
                .select(c => [c])
                .orderBy(c => [c.value.asc()])
                .fetchAll(connection),
            updateB : await o.from(updateB)
                .select(c => [c])
                .orderBy(c => [c.value.asc()])
                .fetchAll(connection),
        };
    });
    t.deepEqual(
        result,
        {
            updateA : [
                { value : 32n },
                { value : 43n },
            ],
            updateB : [
                { value : 34n },
                { value : 133n },
            ]
        }
    );

    t.end();
});
