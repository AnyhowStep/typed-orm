import * as tape from "tape";
import * as o from "../../../../../dist/src/main";
import * as fs from "fs";

tape(__filename, (t) => {
    const query = o.selectExpr(() =>
        o.ExprUtil.fromRawExpr(new Date("2018-01-01T00:00:00Z"))
    );

    const formatter = new o.SqlFormatter();
    const sql = o.QueryTreeUtil.toSql(
        o.QueryUtil.queryTree(query)
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