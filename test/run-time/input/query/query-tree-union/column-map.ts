import * as sd from "schema-decorator";
import * as tape from "tape";
import * as o from "../../../../../dist/src/main";
import * as fs from "fs";

tape(__filename, (t) => {
    const table = o.table(
        "table",
        {
            x : sd.nullable(sd.naturalNumber()),
            y : sd.string(),
            z : sd.boolean(),
            a : sd.naturalNumber(),
            b : sd.string(),
            c : sd.boolean()
        }
    );

    const table2 = o.table(
        "table2",
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
        .select(c => [c])
        .union(
            o.from(table)
                .select(c => [c])
        )
        .union(
            o.from(table2)
                .select(c => [c])
        )
        .union(
            o.DISTINCT,
            o.from(table)
                .select(c => [c])
        )
        .union(
            o.ALL,
            o.from(table2)
                .select(c => [c])
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