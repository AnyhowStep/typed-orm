import * as sd from "schema-decorator";
import * as tape from "tape";
import * as o from "../../../../dist/src/main";
import {pool} from "../../pool";

tape(__filename, async (t) => {
    const result = await pool.acquire(async (connection) => {
        await connection.rawQuery("DROP TEMPORARY TABLE IF EXISTS multiA");
        await connection.rawQuery("DROP TEMPORARY TABLE IF EXISTS multiB");
        await connection.rawQuery(`
            CREATE TEMPORARY TABLE multiA (
                value BIGINT NOT NULL
            )
        `);
        await connection.rawQuery(`
            CREATE TEMPORARY TABLE multiB (
                value BIGINT NOT NULL
            )
        `);
        const multiA = o.table(
            "multiA",
            {
                value : sd.or(
                    sd.numberToString(),
                    sd.string()
                ),
            }
        );
        const multiB = o.table(
            "multiB",
            {
                value : sd.or(
                    sd.numberToString(),
                    sd.string()
                ),
            }
        );
        const insertResult = await o.insertInto(multiA)
            .values(
                { value : "32", },
                { value : "33", },
                { value : "34", },
            )
            .execute(connection);
        t.deepEqual(
            insertResult,
            {
                fieldCount: 0,
                affectedRows: 3,
                insertId: 0n,
                serverStatus: 2,
                warningCount: 0,
                message: "&Records: 3  Duplicates: 0  Warnings: 0",
                protocol41: true,
                changedRows: 0,
                insertedRowCount : 3,
            }
        );
        const insertResult2 = await o.insertInto(multiB)
            .values(
                { value : "33", },
                { value : "34", },
                { value : "35", },
            )
            .execute(connection);
        t.deepEqual(
            insertResult2,
            {
                fieldCount: 0,
                affectedRows: 3,
                insertId: 0n,
                serverStatus: 2,
                warningCount: 0,
                message: "&Records: 3  Duplicates: 0  Warnings: 0",
                protocol41: true,
                changedRows: 0,
                insertedRowCount : 3,
            }
        );
        const deleteResult = await o.from(multiA)
            .leftJoinUsing(
                multiB,
                c => [c.value]
            )
            /*
                A  | B
                32 | NULL
                33 | 33
                34 | 34
            */
            .where(c => o.or(
                o.eq(c.multiA.value, "32"),
                o.nullSafeEq(c.multiB.value, "34"),
            ))
            .delete(t => [t.multiA, t.multiB])
            .execute(connection);
        t.deepEqual(
            deleteResult,
            {
                fieldCount: 0,
                affectedRows: 3,
                insertId: 0,
                serverStatus: 34,
                warningCount: 0,
                message: "",
                protocol41: true,
                changedRows: 0,

                rawFoundRowCount : 3,
                rawDeletedRowCount : 3,
                deletedTableCount : 2,
            }
        );
        return {
            multiA : await o.from(multiA)
                .select(c => [c])
                .orderBy(c => [c.value.asc()])
                .fetchAll(connection),
            multiB : await o.from(multiB)
                .select(c => [c])
                .orderBy(c => [c.value.asc()])
                .fetchAll(connection),
        };
    });
    t.deepEqual(
        result,
        {
            multiA : [
                { value : "33" },
            ],
            multiB : [
                { value : "33" },
                { value : "35" },
            ],
        }
    );

    t.end();
});
