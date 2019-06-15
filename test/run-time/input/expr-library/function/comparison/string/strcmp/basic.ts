import * as sd from "type-mapping";
import * as tape from "tape";
import * as o from "../../../../../../../../dist/src/main";
import * as fs from "fs";

tape(__filename, (t) => {
    const table = o.table(
        "table",
        {
            x : sd.string(),
            y : sd.orNull(sd.string()),
            z : sd.string(),
            a : sd.finiteNumberToBoolean(),
            b : sd.orNull(sd.finiteNumberToBoolean()),
        }
    );
    const query = o.from(table)
        .selectExpr(c => o.strCmp(c.x, c.z));

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