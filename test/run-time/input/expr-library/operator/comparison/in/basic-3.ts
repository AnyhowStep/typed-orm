import * as sd from "type-mapping";
import * as tape from "tape";
import * as o from "../../../../../../../dist/src/main";
import * as fs from "fs";

tape(__filename, (t) => {
    const table = o.table(
        "table",
        {
            x : sd.unsignedInteger(),
            y : sd.orNull(sd.unsignedInteger()),
            z : sd.unsignedInteger(),
            a : sd.finiteNumberToBoolean(),
            b : sd.orNull(sd.finiteNumberToBoolean()),
        }
    );
    const table2 = o.table(
        "table2",
        {
            n : sd.unsignedInteger(),
        }
    );
    const query = o.from(table)
        .selectExpr(c => o.in(
            c.x,
            c.z,
            o.coalesce(
                o.from(table2)
                    .select(c => [c.n])
                    .limit(1),
                o.from(table2)
                    .select(c => [c.n])
                    .limit(1),
                0
            )
        ));

    const formatter = new o.SqlFormatter();
    const sql = o.QueryTreeUtil.toSql(
        o.QueryUtil.queryTreeSelects(query)
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