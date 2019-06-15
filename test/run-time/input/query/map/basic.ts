import * as sd from "type-mapping";
import * as tape from "tape";
import * as o from "../../../../../dist/src/main";

tape(__filename, async (t) => {
    const table = o.table(
        "table",
        {
            x : sd.unsignedInteger(),
            y : sd.string(),
            z : sd.boolean(),
        }
    );

    const query = o.from(table)
        .select(c => [c.x, c.y]);

    const query1 = query
        .map((row) => {
            return {
                hello : "world" as "world",
                ...row,
            }
        });
    const query2 = query
        .map((row) => {
            return Promise.resolve({
                hello : "world" as "world",
                ...row,
            })
        });
    const result1 = await query1._mapDelegate(
        {
            x : 32,
            y : "test"
        },
        null as any,
        {
            x : 32,
            y : "test"
        }
    );
    const result2 = await query2._mapDelegate(
        {
            x : 32,
            y : "test"
        },
        null as any,
        {
            x : 32,
            y : "test"
        }
    );
    t.deepEqual(result1, {
        x : 32,
        y : "test",
        hello : "world",
    });
    t.deepEqual(result2, {
        x : 32,
        y : "test",
        hello : "world",
    });

    t.end();
});
