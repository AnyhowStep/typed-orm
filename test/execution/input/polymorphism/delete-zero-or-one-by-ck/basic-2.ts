import * as sd from "type-mapping";
import * as tape from "tape";
import * as o from "../../../../../dist/src/main";
import {pool} from "../../../pool";

tape(__filename, async (t) => {
    const result = await pool.acquire(async (connection) => {
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
                value : sd.orNull(sd.or(
                    sd.finiteNumberToFiniteNumberString(),
                    sd.string()
                )),
            }
        ).addCandidateKey(c => [c.value]);
        const fkB = o.table(
            "fkB",
            {
                value : sd.orNull(sd.or(
                    sd.finiteNumberToFiniteNumberString(),
                    sd.string()
                )),
            }
        ).addCandidateKey(c => [c.value])
        .addParent(fkA);

        const deleteResult = await o.TablePerTypeUtil.deleteZeroOrOneByCk(
            connection,
            fkB,
            { value : "does not exist" }
        );
        t.deepEqual(
            deleteResult,
            {
                fieldCount: -1,
                affectedRows: 0,
                insertId: 0,
                serverStatus: -1,
                warningCount: 0,
                message: "No rows found for fkB, no rows deleted",
                protocol41: true,
                changedRows: 0,

                rawFoundRowCount : 0,
                rawDeletedRowCount : 0,
                deletedTableCount : 2,
                foundRowCount : 0,
                deletedRowCount : 0,
            }
        );
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
