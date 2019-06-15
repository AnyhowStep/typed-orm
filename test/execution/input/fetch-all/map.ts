import * as sd from "type-mapping";
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
        await connection.rawQuery("INSERT INTO tableA (tableAId, name) VALUES (1, 'hello')");
        await connection.rawQuery("INSERT INTO tableA (tableAId, name) VALUES (2, 'goodbye')");
        await connection.rawQuery("DROP TEMPORARY TABLE IF EXISTS tableB");
        await connection.rawQuery(`
            CREATE TEMPORARY TABLE tableB (
                tableBId INT,
                name VARCHAR(256)
            )
        `);
        await connection.rawQuery("INSERT INTO tableB (tableBId, name) VALUES (1, 'world')");
        await connection.rawQuery("INSERT INTO tableB (tableBId, name) VALUES (2, 'all')");

        const tableA = o.table(
            "tableA",
            {
                tableAId : o.bigint(),
                name : sd.mysql.varChar(1,256),
            }
        );
        const tableB = o.table(
            "tableB",
            {
                tableBId : o.bigint(),
                name : sd.mysql.varChar(1,256),
            }
        ).addCandidateKey(c => [c.tableBId]);
        return o.from(tableA)
            .select(c => [c])
            .map(async (row) => {
                const b = await o.from(tableB)
                    .whereEqCandidateKey(
                        tableB,
                        { tableBId : row.tableAId }
                    )
                    .select(c => [c])
                    .fetchAll(connection);
                return {
                    ...row,
                    b : b[0],
                }
            })
            .orderBy(c => [
                c.tableAId.desc()
            ])
            .fetchAll(connection);
    });
    t.deepEqual(result.length, 2);
    t.deepEqual(
        result,
        [
            {
                tableAId : 2n,
                name : "goodbye",
                b : {
                    tableBId : 2n,
                    name : "all",
                }
            },
            {
                tableAId : 1n,
                name : "hello",
                b : {
                    tableBId : 1n,
                    name : "world",
                }
            },
        ]
    );

    t.end();
});