import * as sd from "type-mapping";
import * as tape from "tape";
import * as o from "../../../../../../../dist/src/main";
import * as fs from "fs";

tape(__filename, (t) => {
    const table = o.table(
        "table",
        {
            x : sd.unsignedInteger(),
            a : sd.unsignedInteger()
        }
    );
    const query = o.from(table)
        .selectExpr(c => o.case(c.x)
            .when(67, 99999 as number)
            .else(o.coalesce(
                o.from(table)
                    .select(c => [c.x])
                    .limit(1),
                89
            ))
        )

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