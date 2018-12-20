import * as tape from "tape";
import * as o from "../../../../../../../dist/src/main";
import * as fs from "fs";

tape(__filename, (t) => {
    const query = o.selectExpr(() => o.concat("test"))

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