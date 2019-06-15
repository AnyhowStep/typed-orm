import * as sd from "type-mapping";
import * as tape from "tape";
import * as o from "../../../../../../dist/src/main";
import * as fs from "fs";

tape(__filename, (t) => {
    const table = o.table(
        "table",
        {
            x : sd.unsignedInteger(),
            y : sd.unsignedInteger(),
            z : sd.boolean(),
        }
    );
    const joined1 = o.table(
        "joined1",
        {
            a : sd.unsignedInteger(),
            b : sd.unsignedInteger(),
            c : sd.unsignedInteger(),
        }
    );

    const query = o.from(table)
        .innerJoin(
            joined1,
            c => [c.x],
            t => [t.c]
        )
        .orderBy(c => [
            o.eq(c.table.x, c.joined1.b)
        ])
        .orderBy(c => [
            [o.eq(c.table.x, c.joined1.a), o.DESC]
        ])
        .orderBy(c => [
            [o.eq(c.joined1.c, c.table.y), o.ASC]
        ])
        .orderBy(c => [
            o.eq(c.table.x, c.joined1.a).desc()
        ])
        .orderBy(c => [
            o.eq(c.joined1.c, c.table.y).asc()
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