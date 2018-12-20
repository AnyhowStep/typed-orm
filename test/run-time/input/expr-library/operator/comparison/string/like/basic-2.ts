import * as sd from "schema-decorator";
import * as tape from "tape";
import * as o from "../../../../../../../../dist/src/main";
import * as fs from "fs";

tape(__filename, (t) => {
    const table = o.table(
        "table",
        {
            str : sd.string()
        }
    );
    const formatter = new o.SqlFormatter();
    const sql = o.QueryTreeUtil.toSql(
        o.like(
            o.coalesce(
                o.from(table).select(c => [c.str]).limit(1),
                ""
            ),
            "%llo%"
        ).queryTree
    );
    const actual = formatter.format(sql);
    t.deepEqual(
        actual,
        fs.readFileSync(
            __filename.replace(/\.ts$/, ".sql")
        ).toString()
    );

    t.end();
});