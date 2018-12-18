import * as sd from "schema-decorator";
import * as tape from "tape";
import * as o from "../../../../../dist/src/main";
import * as fs from "fs";

tape(__filename, (t) => {
    const table = o.table(
        "table",
        {
            x : sd.naturalNumber(),
            y : sd.string(),
            z : sd.boolean(),
            a : sd.naturalNumber(),
            b : sd.string(),
            c : sd.boolean()
        }
    );

    const query = o.from(table)
        .select(c => [c.z, c.x, c.y])
        .union(
            o.from(table)
                .select(c => [c.z, c.x, c.y])
                .union(
                    o.ALL,
                    o.from(table)
                        .select(c => [c.c, c.a, c.b])
                )
        );

    const formatter = new o.SqlFormatter();
    const sql = o.QueryTreeUtil.toSql(
        o.QueryUtil.queryTreeUnion(query)
    );
    const actual = formatter.format(sql);
    t.deepEqual(
        actual,
        fs.readFileSync(
            __filename.replace(/\.ts$/, "-expected.sql")
        ).toString()
    );

    t.end();
});