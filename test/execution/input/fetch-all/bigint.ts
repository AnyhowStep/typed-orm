import * as sd from "type-mapping";
import * as tape from "tape";
import * as o from "../../../../dist/src/main";
import {pool} from "../../pool";

tape(__filename + "-bigint-always-received-as-number-or-bigint", async (t) => {
    const result = await pool.acquire(async (connection) => {
        await connection.rawQuery("DROP TEMPORARY TABLE IF EXISTS bigintTable");
        await connection.rawQuery(`
            CREATE TEMPORARY TABLE bigintTable (
                value BIGINT NOT NULL
            )
        `);
        await connection.rawQuery("INSERT INTO bigintTable (value) VALUES (32)");
        const bigintTable = o.table(
            "bigintTable",
            {
                value : sd.unknown(),
            }
        );
        return o.from(bigintTable)
            .select(c => [c])
            .fetchAll(connection);
    });
    t.deepEqual(result.length, 1);
    t.deepEqual(result[0].value, 32);

    t.end();
});
tape(__filename + "-bigint-always-received-as-number-or-bigint", async (t) => {
    const result = await pool.acquire(async (connection) => {
        await connection.rawQuery("DROP TEMPORARY TABLE IF EXISTS bigintTable");
        await connection.rawQuery(`
            CREATE TEMPORARY TABLE bigintTable (
                value BIGINT NOT NULL
            )
        `);
        await connection.rawQuery("INSERT INTO bigintTable (value) VALUES (9223372036854775807)");
        const bigintTable = o.table(
            "bigintTable",
            {
                value : sd.unknown(),
            }
        );
        return o.from(bigintTable)
            .select(c => [c])
            .fetchAll(connection);
    });
    t.deepEqual(result.length, 1);
    t.deepEqual(result[0].value, 9223372036854775807n);

    t.end();
});

tape(__filename + "-cast-to-bigint-on-client", async (t) => {
    const result = await pool.acquire(async (connection) => {
        await connection.rawQuery("DROP TEMPORARY TABLE IF EXISTS bigintTable");
        await connection.rawQuery(`
            CREATE TEMPORARY TABLE bigintTable (
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
        await connection.rawQuery("DROP TEMPORARY TABLE IF EXISTS unsignedIntTable");
        await connection.rawQuery(`
            CREATE TEMPORARY TABLE unsignedIntTable (
                value INT UNSIGNED NOT NULL
            )
        `);
        await connection.rawQuery("INSERT INTO unsignedIntTable (value) VALUES (4294967295)");
        const unsignedIntTable = o.table(
            "unsignedIntTable",
            {
                value : sd.finiteNumber(),
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

tape(__filename + "-count(*)-returns-bigint-string", async (t) => {
    const {results} = await pool.acquire(async (connection) => {
        await connection.rawQuery("DROP TEMPORARY TABLE IF EXISTS t");
        await connection.rawQuery(`
            CREATE TEMPORARY TABLE t (
                value INT UNSIGNED NOT NULL
            )
        `);
        await connection.rawQuery("INSERT INTO t (value) VALUES (4294967295)");
        await connection.rawQuery("INSERT INTO t (value) VALUES (4294967294)");
        await connection.rawQuery("INSERT INTO t (value) VALUES (4294967293)");
        return connection.rawQuery("SELECT COUNT(*) AS v FROM t");
    });
    t.deepEqual(results.length, 1);
    t.deepEqual(results[0].v, "3");

    t.end();
});


tape(__filename + "-boolean-returns-bigint-string", async (t) => {
    const {results} = await pool.acquire(async (connection) => {
        await connection.rawQuery("DROP TEMPORARY TABLE IF EXISTS t");
        await connection.rawQuery(`
            CREATE TEMPORARY TABLE t (
                value INT UNSIGNED NOT NULL
            )
        `);
        await connection.rawQuery("INSERT INTO t (value) VALUES (4294967295)");
        await connection.rawQuery("INSERT INTO t (value) VALUES (4294967294)");
        await connection.rawQuery("INSERT INTO t (value) VALUES (4294967293)");
        return connection.rawQuery("SELECT EXISTS(SELECT * FROM t) AS v");
    });
    t.deepEqual(results.length, 1);
    t.deepEqual(results[0].v, "1");

    t.end();
});

tape(__filename + "-boolean-returns-bigint-string", async (t) => {
    const {results} = await pool.acquire(async (connection) => {
        return connection.rawQuery("SELECT TRUE AS v");
    });
    t.deepEqual(results.length, 1);
    t.deepEqual(results[0].v, "1");

    t.end();
});

tape(__filename + "-boolean-returns-bigint-string", async (t) => {
    const {results} = await pool.acquire(async (connection) => {
        return connection.rawQuery("SELECT FALSE AS v");
    });
    t.deepEqual(results.length, 1);
    t.deepEqual(results[0].v, "0");

    t.end();
});

tape(__filename + "-bigint-literal", async (t) => {
    const {results} = await pool.acquire(async (connection) => {
        return connection.rawQuery("SELECT 314159265 AS v");
    });
    t.deepEqual(results.length, 1);
    t.deepEqual(results[0].v, "314159265");

    t.end();
});

tape(__filename + "-decimal-literal", async (t) => {
    const {results} = await pool.acquire(async (connection) => {
        return connection.rawQuery("SELECT 3.14159265 AS v");
    });
    t.deepEqual(results.length, 1);
    t.deepEqual(results[0].v, "3.14159265");

    t.end();
});

tape(__filename + "-decimal-literal", async (t) => {
    const {results} = await pool.acquire(async (connection) => {
        return connection.rawQuery("SELECT 3.1415926535897932384626433832795028841971693993751 AS v");
    });
    t.deepEqual(results.length, 1);
    t.deepEqual(results[0].v, "3.1415926535897932384626433832795028841971693993751");

    t.end();
});

tape(__filename + "-double-column-becomes-number", async (t) => {
    const {results} = await pool.acquire(async (connection) => {
        await connection.rawQuery("DROP TEMPORARY TABLE IF EXISTS d");
        await connection.rawQuery(`
            CREATE TEMPORARY TABLE d (
                value DOUBLE NOT NULL
            )
        `);
        await connection.rawQuery("INSERT INTO d (value) VALUES (3.1415926535897932384626433832795028841971693993751)");
        return connection.rawQuery("SELECT value AS v FROM d");
    });
    t.deepEqual(results.length, 1);
    t.deepEqual(results[0].v, 3.141592653589793);

    t.end();
});

tape(__filename + "-add-0e0-to-cast-to-double-becomes-number", async (t) => {
    const {results} = await pool.acquire(async (connection) => {
        return connection.rawQuery("SELECT 3.1415926535897932384626433832795028841971693993751 + 0e0 AS v");
    });
    t.deepEqual(results.length, 1);
    t.deepEqual(results[0].v, 3.141592653589793);

    t.end();
});

tape(__filename + "-decimal-literal-add-zero-literal", async (t) => {
    const {results} = await pool.acquire(async (connection) => {
        return connection.rawQuery("SELECT 3.1415926535897932384626433832795028841971693993751+0 AS v");
    });
    t.deepEqual(results.length, 1);
    t.deepEqual(results[0].v, "3.1415926535897932384626433832795028841971693993751");

    t.end();
});

tape(__filename + "-ceil-gives-bigint-string", async (t) => {
    const {results} = await pool.acquire(async (connection) => {
        return connection.rawQuery("SELECT CEIL(3.1415926535897932384626433832795028841971693993751) AS v");
    });
    t.deepEqual(results.length, 1);
    t.deepEqual(results[0].v, "4");

    t.end();
});

tape(__filename + "-floor-gives-bigint-string", async (t) => {
    const {results} = await pool.acquire(async (connection) => {
        return connection.rawQuery("SELECT FLOOR(3.1415926535897932384626433832795028841971693993751) AS v");
    });
    t.deepEqual(results.length, 1);
    t.deepEqual(results[0].v, "3");

    t.end();
});

tape(__filename + "-round-gives-bigint-string", async (t) => {
    const {results} = await pool.acquire(async (connection) => {
        return connection.rawQuery("SELECT ROUND(3.1415926535897932384626433832795028841971693993751) AS v");
    });
    t.deepEqual(results.length, 1);
    t.deepEqual(results[0].v, "3");

    t.end();
});

tape(__filename + "-ascii-gives-bigint-string", async (t) => {
    const {results} = await pool.acquire(async (connection) => {
        return connection.rawQuery("SELECT ASCII('Hello, world') AS v");
    });
    t.deepEqual(results.length, 1);
    t.deepEqual(results[0].v, "72");

    t.end();
});

tape(__filename + "-interval-gives-bigint-string", async (t) => {
    const {results} = await pool.acquire(async (connection) => {
        return connection.rawQuery("SELECT INTERVAL(5, 1,2,3,4,6,7,8) AS v");
    });
    t.deepEqual(results.length, 1);
    t.deepEqual(results[0].v, "4");

    t.end();
});