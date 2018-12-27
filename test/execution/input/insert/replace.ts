import * as tape from "tape";
import * as o from "../../../../dist/src/main";
import {pool} from "../../pool";

tape(__filename, async (t) => {
    const result = await pool.acquire(async (connection) => {
        await connection.rawQuery("DROP TABLE IF EXISTS autoId");
        await connection.rawQuery(`
            CREATE TABLE autoId (
                \`someId\` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
                PRIMARY KEY(\`someId\`)
            ) AUTO_INCREMENT = 18446744073709551614;
        `);
        const autoId = o.table(
            "autoId",
            {
                someId : o.bigint(),
            }
        ).setAutoIncrement(c => c.someId);
        const insertResult = await o.replaceInto(autoId)
            .values({
            })
            .execute(connection);
        t.deepEqual(
            insertResult,
            {
                fieldCount: 0,
                affectedRows: 1,
                insertId: 18446744073709551614n,
                serverStatus: 2,
                warningCount: 0,
                message: "",
                protocol41: true,
                changedRows: 0,
                someId : 18446744073709551614n,
            }
        );
        return o.from(autoId)
            .select(c => [c])
            .fetchAll(connection);
    });
    t.deepEqual(result.length, 1);
    t.deepEqual(result[0].someId, 18446744073709551614n);

    t.end();
});
