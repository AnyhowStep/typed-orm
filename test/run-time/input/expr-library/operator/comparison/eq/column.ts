import * as sd from "type-mapping";
import * as tape from "tape";
import * as o from "../../../../../../../dist/src/main";
import * as fs from "fs";

tape(__filename, (t) => {
    const table = o.table(
        "table",
        {
            x : sd.unsignedInteger(),
            y : sd.unsignedInteger(),
            z : sd.unsignedInteger(),
            a : sd.finiteNumberToBoolean(),
        }
    );
    const query = o.from(table)
        .selectExpr(c => o.eq(c.z, c.y))
        .select(c => [o.eq(c.a, true).as("booleanEq")])
        .select(c => [o.eq(o.eq(c.y, c.x), false).as("nestedEq")]);

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