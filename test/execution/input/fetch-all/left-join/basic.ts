import * as tape from "tape";
import * as o from "../../../../../dist/src/main";
import {pool} from "../../../pool";

tape(__filename, async (t) => {
    await pool.acquire(async (connection) => {
        await connection.rawQuery("DROP TEMPORARY TABLE IF EXISTS tableA");
        await connection.rawQuery("DROP TEMPORARY TABLE IF EXISTS tableB");
        await connection.rawQuery(`
            CREATE TEMPORARY TABLE tableA (
                value BIGINT NOT NULL,
                other VARCHAR(255)
            )
        `);
        await connection.rawQuery(`
            CREATE TEMPORARY TABLE tableB (
                value BIGINT NOT NULL,
                other VARCHAR(255)
            )
        `);
        const tableA = o.table(
            "tableA",
            {
                value : o.bigint(),
                other : o.varChar()
            }
        ).addCandidateKey(c => [c.value]);
        const tableB = o.table(
            "tableB",
            {
                value : o.bigint(),
                other : o.varChar()
            }
        ).addCandidateKey(c => [c.value]);

        await tableA.insert(connection, {
            value : 1n,
            other : "hello"
        });
        await tableB.insert(connection, {
            value : 1n,
            other : "world"
        });
        await tableA.insert(connection, {
            value : 2n,
            other : "goodbye"
        });
        await tableB.insert(connection, {
            value : 3n,
            other : "all"
        });

        const result = await o.from(tableA)
            .leftJoinUsing(tableB, c => [c.value])
            .select(c => [c])
            .orderBy(c => [c.tableA.value.asc()])
            .fetchAll(connection);
        t.deepEqual(
            result,
            [
                {
                    tableA : {
                        value : 1n,
                        other : "hello",
                    },
                    tableB : {
                        value : 1n,
                        other : "world",
                    },
                },
                {
                    tableA : {
                        value : 2n,
                        other : "goodbye",
                    },
                    tableB : undefined,
                },
            ]
        );

        {
            const result = await o.from(tableA)
                .leftJoinUsing(tableB, c => [c.value])
                .select(c => [c, o.ExprUtil.fromRawExpr(null).as("someNullColumn")])
                .orderBy(c => [c.tableA.value.asc()])
                .fetchAll(connection);
            t.deepEqual(
                result,
                [
                    {
                        tableA : {
                            value : 1n,
                            other : "hello",
                        },
                        tableB : {
                            value : 1n,
                            other : "world",
                        },
                        __aliased : {
                            someNullColumn : null,
                        },
                    },
                    {
                        tableA : {
                            value : 2n,
                            other : "goodbye",
                        },
                        tableB : undefined,
                        __aliased : {
                            someNullColumn : null,
                        },
                    },
                ]
            );
        }
    });

    t.end();
});