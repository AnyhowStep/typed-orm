import * as sd from "type-mapping";
import * as tape from "tape";
import * as o from "../../../../../../dist/src/main";
import * as fs from "fs";

tape(__filename, (t) => {
    const table = o.table(
        "table",
        {
            x : sd.unsignedInteger(),
            y : sd.string(),
            z : sd.boolean(),
        }
    );

    const query = o.from(table)
        .orderBy(c => [c.x])
        .orderBy(c => [
            [c.y, o.ASC]
        ])
        .orderBy(c => [
            [c.z, o.DESC]
        ])
        .orderBy(c => [
            c.y.asc()
        ])
        .orderBy(c => [
            c.z.desc()
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