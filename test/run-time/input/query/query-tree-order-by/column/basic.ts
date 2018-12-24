import * as sd from "schema-decorator";
import * as tape from "tape";
import * as o from "../../../../../../dist/src/main";
import * as fs from "fs";

tape(__filename, (t) => {
    const table = o.table(
        "table",
        {
            x : sd.naturalNumber(),
            y : sd.string(),
            z : sd.boolean(),
        }
    );

    const query = o.from(table)
        .orderBy(c => [
            c.x,
            [c.y, o.ASC],
            [c.z, o.DESC],
            c.y.asc(),
            c.z.desc(),
            c.y.sort(o.ASC),
            c.z.sort(o.DESC)
        ]);

    const formatter = new o.SqlFormatter();
    const sql = o.QueryTreeUtil.toSql(
        o.QueryUtil.queryTreeOrderBy(query)
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