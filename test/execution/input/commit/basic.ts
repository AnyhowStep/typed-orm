import * as sd from "schema-decorator";
import * as tape from "tape";
import * as o from "../../../../dist/src/main";
import {pool} from "../../pool";

tape(__filename, async (t) => {
    const result = await pool.acquire(async (connection) => {
        await connection.rawQuery("DROP TEMPORARY TABLE IF EXISTS tableA");
        await connection.rawQuery(`
            CREATE TEMPORARY TABLE tableA (
                tableAId INT,
                name VARCHAR(256)
            )
        `);
        await connection.transaction(async (transaction) => {
            await transaction.rawQuery("INSERT INTO tableA (tableAId, name) VALUES (1337, 'hello, world')");
            await transaction.commit();
        });

        const tableA = o.table(
            "tableA",
            {
                tableAId : o.bigint(),
                name : sd.varChar(1,256),
            }
        );
        return o.from(tableA)
            .select(c => [c])
            .fetchAll(connection);
    });
    t.deepEqual(result.length, 1);
    t.deepEqual(result, [
        {
            tableAId : 1337n,
            name : "hello, world",
        }
    ])

    t.end();
});