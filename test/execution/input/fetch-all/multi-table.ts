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
        await connection.rawQuery("INSERT INTO tableA (tableAId, name) VALUES (1, 'hello')");
        await connection.rawQuery("DROP TEMPORARY TABLE IF EXISTS tableB");
        await connection.rawQuery(`
            CREATE TEMPORARY TABLE tableB (
                tableBId INT,
                name VARCHAR(256)
            )
        `);
        await connection.rawQuery("INSERT INTO tableB (tableBId, name) VALUES (1, 'world')");

        const tableA = o.table(
            "tableA",
            {
                tableAId : o.bigint(),
                name : sd.varChar(1,256),
            }
        );
        const tableB = o.table(
            "tableB",
            {
                tableBId : o.bigint(),
                name : sd.varChar(1,256),
            }
        );
        return o.from(tableA)
            .innerJoin(
                tableB,
                c => [c.tableAId],
                c => [c.tableBId]
            )
            .select(c => [c])
            .fetchAll(connection);
    });
    t.deepEqual(result.length, 1);
    t.deepEqual(
        result[0],
        {
            tableA : {
                tableAId : 1n,
                name : "hello",
            },
            tableB : {
                tableBId : 1n,
                name : "world",
            }
        }
    );

    t.end();
});

tape(__filename, async (t) => {
    const result = await pool.acquire(async (connection) => {
        await connection.rawQuery("DELETE FROM tableA");
        await connection.rawQuery("DELETE FROM tableB");
        await connection.rawQuery("INSERT INTO tableA (tableAId, name) VALUES (1, 'hello')");
        await connection.rawQuery("INSERT INTO tableB (tableBId, name) VALUES (1, 'world')");
        await connection.rawQuery("INSERT INTO tableA (tableAId, name) VALUES (2, 'goodbye')");
        await connection.rawQuery("INSERT INTO tableB (tableBId, name) VALUES (2, 'all')");

        const tableA = o.table(
            "tableA",
            {
                tableAId : o.bigint(),
                name : sd.varChar(1,256),
            }
        );
        const tableB = o.table(
            "tableB",
            {
                tableBId : o.bigint(),
                name : sd.varChar(1,256),
            }
        );
        return o.from(tableA)
            .innerJoin(
                tableB,
                c => [c.tableAId],
                c => [c.tableBId]
            )
            .select(c => [
                c.tableA.tableAId,
                c.tableB,
            ])
            .orderBy(c => [
                c.tableA.tableAId.desc()
            ])
            .fetchAll(connection);
    });
    t.deepEqual(result.length, 2);
    t.deepEqual(
        result,
        [
            {
                tableAId : 2n,
                tableBId : 2n,
                name : "all",
            },
            {
                tableAId : 1n,
                tableBId : 1n,
                name : "world",
            },
        ]
    );

    t.end();
});
