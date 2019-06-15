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
        }
    );
    const joined1 = o.table(
        "joined1",
        {
            a : sd.mysql.dateTime(3),
            b : sd.instanceOfBuffer(),
            c : sd.string()
        }
    );
    const joined2 = o.table(
        "joined2",
        {
            j : sd.mysql.dateTime(3),
            k : sd.instanceOfBuffer(),
            l : sd.string()
        }
    );
    const joined3 = o.table(
        "joined3",
        {
            d : sd.mysql.dateTime(3),
            e : sd.instanceOfBuffer(),
            f : sd.string()
        }
    );

    const query = o.from(table)
        .innerJoin(
            joined1,
            c => [c.y],
            t => [t.c]
        )
        .leftJoin(
            joined2,
            c => [c.table.y, c.joined1.a],
            t => [t.l, t.j]
        )
        .rightJoin(
            joined3,
            c => [c.table.y, c.joined1.a, c.joined2.k],
            t => [t.f, t.d, t.e]
        );

    const formatter = new o.SqlFormatter();
    const sql = o.QueryTreeUtil.toSql(
        o.QueryUtil.queryTreeJoins(query)
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