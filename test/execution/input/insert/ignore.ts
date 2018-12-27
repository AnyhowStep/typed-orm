import * as tape from "tape";
import * as o from "../../../../dist/src/main";
import {pool} from "../../pool";

tape(__filename, async (t) => {
    const result = await pool.acquire(async (connection) => {
        await connection.rawQuery("DROP TABLE IF EXISTS autoIdIgnore");
        await connection.rawQuery(`
            CREATE TABLE autoIdIgnore (
                \`someId\` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
                \`other\` BIGINT UNSIGNED NOT NULL,
                PRIMARY KEY(\`someId\`),
                UNIQUE (\`other\`)
            ) AUTO_INCREMENT = 18446744073709551604;
        `);
        const autoIdIgnore = o.table(
            "autoIdIgnore",
            {
                someId : o.bigint(),
                other : o.bigint(),
            }
        ).setAutoIncrement(c => c.someId);
        const insertResult = await o.insertInto(autoIdIgnore)
            .values({
                other : 55n
            })
            .execute(connection);
        t.deepEqual(
            insertResult,
            {
                fieldCount: 0,
                affectedRows: 1,
                insertId: 18446744073709551604n,
                serverStatus: 2,
                warningCount: 0,
                message: "",
                protocol41: true,
                changedRows: 0,
                someId : 18446744073709551604n,
            }
        );
        const insertIgnoreResult = await o.insertIgnoreInto(autoIdIgnore)
            .values({
                other : 55n
            })
            .values({
                other : 55n
            })
            .values({
                other : 55n
            })
            .values({
                other : 54n
            })
            .execute(connection);
        t.deepEqual(
            insertIgnoreResult,
            {
                fieldCount: 0,
                affectedRows: 1,
                insertId: 18446744073709551605n,
                serverStatus: 2,
                warningCount: 3,
                message: "&Records: 4  Duplicates: 3  Warnings: 3",
                protocol41: true,
                changedRows: 3,
                someId : 18446744073709551605n,
            }
        );
        const insertIgnoreResult2 = await o.insertIgnoreInto(autoIdIgnore)
            .values({
                other : 55n
            })
            .values({
                other : 55n
            })
            .values({
                other : 50n
            })
            .execute(connection);
        t.deepEqual(
            insertIgnoreResult2,
            {
                fieldCount: 0,
                affectedRows: 1,
                insertId: 18446744073709551609n,
                serverStatus: 2,
                warningCount: 2,
                message: "&Records: 3  Duplicates: 2  Warnings: 2",
                protocol41: true,
                changedRows: 2,
                someId : 18446744073709551609n,
            }
        );
        const insertIgnoreResult3 = await o.insertIgnoreInto(autoIdIgnore)
            .values({
                other : 50n
            })
            .execute(connection);
        t.deepEqual(
            insertIgnoreResult3,
            {
                fieldCount: 0,
                affectedRows: 0,
                insertId: 0n,
                serverStatus: 2,
                warningCount: 1,
                message: "",
                protocol41: true,
                changedRows: 0,
                someId : undefined,
            }
        );
        return o.from(autoIdIgnore)
            .select(c => [c])
            .orderBy(c => [c.other])
            .fetchAll(connection);
    });
    t.deepEqual(result.length, 3);
    t.deepEqual(result[0].someId, 18446744073709551609n);
    t.deepEqual(result[1].someId, 18446744073709551605n);
    t.deepEqual(result[2].someId, 18446744073709551604n);

    t.end();
});
