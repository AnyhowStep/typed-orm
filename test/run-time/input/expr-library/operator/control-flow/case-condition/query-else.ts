import * as sd from "schema-decorator";
import * as tape from "tape";
import * as o from "../../../../../../../dist/src/main";
import * as fs from "fs";

tape(__filename, (t) => {
    const table = o.table(
        "table",
        {
            x : sd.naturalNumber(),
            a : sd.naturalNumber()
        }
    );
    const query = o.from(table)
        .selectExpr(() => o.case()
            .when(false, 99999 as number)
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