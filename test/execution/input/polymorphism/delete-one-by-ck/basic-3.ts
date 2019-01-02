import * as sd from "schema-decorator";
import * as tape from "tape";
import * as o from "../../../../../dist/src/main";
import {pool} from "../../../pool";

tape(__filename, async (t) => {
    const result = await pool.acquire(async (connection) => {
        await connection.rawQuery("DROP TABLE IF EXISTS fkB");
        await connection.rawQuery("DROP TABLE IF EXISTS fkA");
        await connection.rawQuery(`
            CREATE TABLE fkA (
                value BIGINT NULL
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
        ).addCandidateKey(c => [c.value]);
        const fkB = o.table(
            "fkB",
            {
                value : sd.nullable(sd.string()),
            }
        ).addCandidateKey(c => [c.value])
        .addParent(fkA);

        await o.PolymorphismUtil.deleteOneByCk(
            connection,
            fkB,
            { value : null }
        ).then(() => {
            t.fail("Should not delete anything")
        }).catch((err) => {
            t.pass(err.message);
        });
        return {
            fkA : await o.from(fkA)
                .select(c => [c])
                .orderBy(c => [c.value.asc()])
                .fetchAll(connection),
            fkB : await o.from(fkB)
                .select(c => [c])
                .orderBy(c => [c.value.asc()])
                .fetchAll(connection),
        }
    });
    t.deepEqual(
        result,
        {
            fkA : [
                { value : "32" },
                { value : "33" },
                { value : "34" },
            ],
            fkB : [
                { value : null },
                { value : "32" },
            ],
        }
    )

    t.end();
});
