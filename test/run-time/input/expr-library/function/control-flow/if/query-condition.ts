import * as sd from "schema-decorator";
import * as tape from "tape";
import * as o from "../../../../../../../dist/src/main";
import * as fs from "fs";

tape(__filename, (t) => {
    const table = o.table(
        "table",
        {
            x : sd.naturalNumber(),
            a : sd.naturalNumber(),
            b : sd.numberToBoolean(),
        }
    );
    const query = o.selectExpr(() => o.if(
        o.coalesce(
            o.from(table)
                .select(c => [c.b])
                .limit(1),
            false
        ),
        45,
        999
    ))

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