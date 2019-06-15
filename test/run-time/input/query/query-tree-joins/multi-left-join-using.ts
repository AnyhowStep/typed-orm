import * as sd from "type-mapping";
import * as tape from "tape";
import * as o from "../../../../../dist/src/main";
import * as fs from "fs";

tape(__filename, (t) => {
    const table = o.table(
        "table",
        {
            x : sd.orNull(sd.unsignedInteger()),
            y : sd.string(),
            z : sd.boolean(),
        }
    );
    const joined1 = o.table(
        "joined1",
        {
            a : sd.mysql.dateTime(3),
            b : sd.instanceOfBuffer(),
            y : sd.string()
        }
    );
    const joined2 = o.table(
        "joined2",
        {
            x : sd.unsignedInteger(),
            b : sd.orNull(sd.instanceOfBuffer()),
            l : sd.string()
        }
    );
    const query = o.from(table)
        .leftJoinUsing(
            joined1,
            c => [c.y, c.y]
        )
        .leftJoinUsing(
            joined2,
            c => [c.table.x, c.joined1.b]
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