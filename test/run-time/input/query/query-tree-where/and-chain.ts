import * as sd from "type-mapping";
import * as tape from "tape";
import * as o from "../../../../../dist/src/main";
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
        .where(c => o.and(c.z, c.x, o.and(c.y, c.z, o.and(c.x, c.y))))
        .where(c => c.z);

    const formatter = new o.SqlFormatter();
    const sql = o.QueryTreeUtil.toSql(
        o.QueryUtil.queryTreeWhere(query)
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