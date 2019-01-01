import * as sd from "schema-decorator";
import * as tape from "tape";
import * as o from "../../../../dist/src/main";
import {pool} from "../../pool";

tape(__filename, async (t) => {
    await pool.acquire(async (connection) => {
        await connection.rawQuery("DROP TABLE IF EXISTS fkB");
        await connection.rawQuery("DROP TABLE IF EXISTS fkA");
        await connection.rawQuery(`
            CREATE TABLE fkA (
                value BIGINT NOT NULL
            )
        `);
        await connection.rawQuery(`
            ALTER TABLE fkA
            ADD INDEX (value)
        `);
        await connection.rawQuery(`
            CREATE TABLE fkB (
                value BIGINT NULL
            )
        `);
        await connection.rawQuery(`
            ALTER TABLE fkB
            ADD INDEX (value)
        `);
        await connection.rawQuery(`
            INSERT INTO fkA (value) VALUES (32), (33), (34)
        `);
        await connection.rawQuery(`
            INSERT INTO fkB (value) VALUES (32), (NULL)
        `);
        await connection.rawQuery(`
            ALTER TABLE fkB ADD FOREIGN KEY (value)
            REFERENCES fkA (value)
            ON DELETE RESTRICT
            ON UPDATE RESTRICT
        `);
        const fkA = o.table(
            "fkA",
            {
                value : sd.nullable(sd.string()),
            }
        );
        const deleteResult = await o.from(fkA)
            .deleteIgnore(t => [t.fkA])
            .execute(connection);
        t.deepEqual(
            deleteResult,
            {
                fieldCount: 0,
                affectedRows: 2,
                insertId: 0,
                serverStatus: 34,
                warningCount: 1,
                message: "",
                protocol41: true,
                changedRows: 0,

                rawFoundRowCount : 3,
                rawDeletedRowCount : 2,
            }
        );
    });

    t.end();
});
