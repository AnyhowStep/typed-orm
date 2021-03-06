import * as sd from "type-mapping";
import * as tape from "tape";
import * as o from "../../../../../dist/src/main";
import * as fs from "fs";

tape(__filename, (t) => {
    const table = o.table(
        "table",
        {
            z : sd.unsignedInteger(),
            y : sd.string(),
            x : sd.boolean(),
        }
    );
    const joined1 = o.table(
        "joined1",
        {
            b : sd.string(),
            x : sd.boolean(),
            a : sd.unsignedInteger(),
        }
    );

    const query = o.from(table)
        .innerJoinUsing(
            joined1,
            c => [c.x]
        )
        .select(c => [
            c.joined1,
            c.table,
        ]);

    const formatter = new o.SqlFormatter();
    const sql = o.QueryTreeUtil.toSql(
        o.QueryUtil.queryTreeSelects(query)
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