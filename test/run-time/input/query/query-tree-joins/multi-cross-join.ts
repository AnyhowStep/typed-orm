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
            y : sd.string()
        }
    );
    const joined2 = o.table(
        "joined2",
        {
            x : sd.unsignedInteger(),
            b : sd.instanceOfBuffer(),
            l : sd.string()
        }
    );
    const query = o.from(table)
        .crossJoin(
            joined1
        )
        .crossJoin(
            joined2
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