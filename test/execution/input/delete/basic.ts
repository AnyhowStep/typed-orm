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
        );
        const insertResult = await o.insertInto(bigintTable)
            .values(
                { value : "32", },
                { value : "33", }
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
        const deleteResult = await o.from(bigintTable)
            .whereEq(c => c.value, "32")
            .delete(t => [t.bigintTable])
            .execute(connection);
        t.deepEqual(
            deleteResult,
            {
                fieldCount: 0,
                affectedRows: 1,
                insertId: 0,
                serverStatus: 34,
                warningCount: 0,
                message: "",
                protocol41: true,
                changedRows: 0,

                rawFoundRowCount : 1,
                rawDeletedRowCount : 1,
                deletedTableCount : 1,
            }
        );
        return o.from(bigintTable)
            .select(c => [c])
            .orderBy(c => [c.value.asc()])
            .fetchAll(connection);
    });
    t.deepEqual(
        result,
        [
            { value : "33" },
        ]
    );

    t.end();
});
