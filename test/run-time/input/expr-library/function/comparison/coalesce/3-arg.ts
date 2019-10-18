import * as tape from "tape";
import * as o from "../../../../../../../dist/src/main";
import * as fs from "fs";

tape(__filename, (t) => {
    const expr = o.coalesce(false, o.selectExpr(() => o.ExprUtil.fromRawExpr(false)), false);

    const formatter = new o.SqlFormatter();
    const sql = o.QueryTreeUtil.toSql(
        expr.queryTree
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