import * as sd from "type-mapping";
import * as tape from "tape";
import * as o from "../../../../../dist/src/main";
import * as fs from "fs";

tape(__filename, (t) => {
    const table = o.table(
        "table",
        {
            x : sd.unsignedInteger(),
            y : sd.string(),
            z : sd.boolean(),
            a : sd.unsignedInteger(),
            b : sd.string(),
            c : sd.boolean()
        }
    );

    const query = o.from(table)
        .select(c => [c.z, c.x, c.y, o.eq(c.x, c.a).as("lol")])
        .union(
            o.from(table)
                .select(c => [o.eq(c.y, c.b).as("test"), c.x, c.y, c.z])
        )
        .union(
            o.from(table)
                .select(c => [c.c, c.a, c.b, c.c.as("other")])
        )
        .union(
            o.DISTINCT,
            o.from(table)
                .select(c => [c.c, c.a, c.b, c.z])
        )
        .union(
            o.ALL,
            o.from(table)
                .select(c => [c.c, c.a, c.b, o.and(c.c, c.z).as("thing")])
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