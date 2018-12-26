import * as sd from "schema-decorator";
import * as tape from "tape";
import * as o from "../../../../dist/src/main";
import {pool} from "../../pool";

tape(__filename + "-bigint-always-received-as-string", async (t) => {
    const result = await pool.acquire(async (connection) => {
        await connection.rawQuery("DROP TABLE IF EXISTS bigintTable");
        await connection.rawQuery(`
            CREATE TABLE bigintTable (
                value BIGINT NOT NULL
            )
        `);
        await connection.rawQuery("INSERT INTO bigintTable (value) VALUES (32)");
        const bigintTable = o.table(
            "bigintTable",
            {
                value : sd.string(),
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

tape(__filename + "-cast-to-bigint-on-client", async (t) => {
    const result = await pool.acquire(async (connection) => {
        await connection.rawQuery("DROP TABLE IF EXISTS bigintTable");
        await connection.rawQuery(`
            CREATE TABLE bigintTable (
                value BIGINT NOT NULL
            )
        `);
        await connection.rawQuery("INSERT INTO bigintTable (value) VALUES (32)");
        const bigintTable = o.table(
            "bigintTable",
            {
                value : o.bigint(),
            }
        );
        return o.from(bigintTable)
            .select(c => [c])
            .fetchAll(connection);
    });
    t.deepEqual(result.length, 1);
    t.deepEqual(result[0].value, 32n);

    t.end();
});


tape(__filename + "-int-and-smaller-always-received-as-number", async (t) => {
    const result = await pool.acquire(async (connection) => {
        await connection.rawQuery("DROP TABLE IF EXISTS unsignedIntTable");
        await connection.rawQuery(`
            CREATE TABLE unsignedIntTable (
                value INT UNSIGNED NOT NULL
            )
        `);
        await connection.rawQuery("INSERT INTO unsignedIntTable (value) VALUES (4294967295)");
        const unsignedIntTable = o.table(
            "unsignedIntTable",
            {
                value : sd.number(),
            }
        );
        return o.from(unsignedIntTable)
            .select(c => [c])
            .fetchAll(connection);
    });
    t.deepEqual(result.length, 1);
    t.deepEqual(result[0].value, 4294967295);

    t.end();
});