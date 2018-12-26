import * as sd from "schema-decorator";
import * as tape from "tape";
import * as o from "../../../../dist/src/main";
import {pool} from "../../pool";

tape(__filename, async (t) => {
    const result = await pool.acquire((connection) => {
        return o.selectExpr(() => o.utcTimestamp())
            .fetchAll(connection);
    });
    t.deepEqual(result.length, 1);
    t.assert(result[0].value instanceof Date);

    t.end();
});

tape(__filename, async (t) => {
    const result = await pool.acquire((connection) => {
        return o.selectExpr(
            () => o.ExprUtil.fromRawExpr(new Date("2018-01-01T00:00:00Z"))
        ).fetchAll(
            connection
        );
    });
    t.deepEqual(result.length, 1);
    t.assert(result[0].value instanceof Date);
    t.deepEqual(result[0].value.getTime(), 1514764800000);

    t.end();
});

tape(__filename, async (t) => {
    const result = await pool.acquire(async (connection) => {
        await connection.rawQuery("DROP TABLE IF EXISTS dateTable");
        await connection.rawQuery(`
            CREATE TABLE dateTable (
                value DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
            )
        `);
        await connection.rawQuery("INSERT INTO dateTable (value) VALUES (DEFAULT)");
        const dateTable = o.table(
            "dateTable",
            {
                value : sd.date(),
            }
        );
        return o.from(dateTable)
            .select(c => [c])
            .fetchAll(connection);
    });
    t.deepEqual(result.length, 1);
    t.assert(result[0].value instanceof Date);

    t.end();
});


tape(__filename, async (t) => {
    const result = await pool.acquire(async (connection) => {
        await connection.rawQuery("DROP TABLE IF EXISTS dateTable3");
        await connection.rawQuery(`
            CREATE TABLE dateTable3 (
                value3 DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3)
            )
        `);
        await connection.rawQuery("INSERT INTO dateTable3 (value3) VALUES (DEFAULT)");
        const dateTable3 = o.table(
            "dateTable3",
            {
                value3 : sd.date(),
            }
        );
        return o.from(dateTable3)
            .select(c => [c])
            .fetchAll(connection);
    });
    t.deepEqual(result.length, 1);
    t.assert(result[0].value3 instanceof Date);

    t.end();
});

tape(__filename, async (t) => {
    const now = new Date();
    const result = await pool.acquire((connection) => {
        return o.selectExpr(
            () => o.ExprUtil.fromRawExpr(now)
        ).fetchAll(
            connection
        );
    });
    t.deepEqual(result.length, 1);
    t.assert(result[0].value instanceof Date);
    t.deepEqual(result[0].value.getTime(), now.getTime());

    t.end();
});

tape(__filename, async (t) => {
    const {results} = await pool.acquire(async (connection) => {
        return connection.rawQuery("SELECT NOW(3) - UTC_TIMESTAMP(3) AS v");
    });
    t.deepEqual(results.length, 1);
    t.deepEqual(results[0].v, "0.000");

    t.end();
});
