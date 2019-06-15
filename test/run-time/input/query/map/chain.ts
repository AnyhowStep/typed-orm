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
    const query3 = query1
        .map((row) => {
            return {
                chain : "hang low" as "hang low",
                ...row
            }
        });
    const query4 = query1
        .map((row) => {
            return Promise.resolve({
                chain : "hang low" as "hang low",
                ...row
            })
        });
    const query5 = query2
        .map((row) => {
            return {
                chain : "hang low" as "hang low",
                ...row
            }
        });
    const query6 = query2
        .map((row) => {
            return Promise.resolve({
                chain : "hang low" as "hang low",
                ...row
            })
        });
    const row = {
        x : 32,
        y : "test",
    }
    const result3 = await query3._mapDelegate(row, null as any, row).then(result => result);
    const result4 = await query4._mapDelegate(row, null as any, row).then(result => result);
    const result5 = await query5._mapDelegate(row, null as any, row).then(result => result);
    const result6 = await query6._mapDelegate(row, null as any, row).then(result => result);
    t.deepEqual(result3, {
        x : 32,
        y : "test",
        hello : "world",
        chain : "hang low",
    });
    t.deepEqual(result4, {
        x : 32,
        y : "test",
        hello : "world",
        chain : "hang low",
    });
    t.deepEqual(result5, {
        x : 32,
        y : "test",
        hello : "world",
        chain : "hang low",
    });
    t.deepEqual(result6, {
        x : 32,
        y : "test",
        hello : "world",
        chain : "hang low",
    });

    t.end();
});
