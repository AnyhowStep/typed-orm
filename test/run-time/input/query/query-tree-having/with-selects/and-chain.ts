import * as sd from "schema-decorator";
import * as tape from "tape";
import * as o from "../../../../../../dist/src/main";
import * as fs from "fs";

tape(__filename, (t) => {
    const table = o.table(
        "table",
        {
            x : sd.boolean(),
            y : sd.boolean(),
            z : sd.boolean(),
        }
    );

    const query = o.from(table)
        .select(c => [
            c.z.as("test"),
            o.eq(c.x, c.x).as("eq")
        ])
        .andHaving(c => o.and(
            c.table.z,
            c.table.test,
            o.and(
                c.table.y,
                c.table.z,
                o.and(
                    c.__aliased.eq,
                    c.table.y
                )
            )
        ))
        .andHaving(c => c.table.z);

    const formatter = new o.SqlFormatter();
    const sql = o.QueryTreeUtil.toSql(
        o.QueryUtil.queryTreeHaving(query)
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