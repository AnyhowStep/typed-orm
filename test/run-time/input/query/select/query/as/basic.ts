import * as sd from "type-mapping";
import * as tape from "tape";
import * as o from "../../../../../../../dist/src/main";
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

    const selectItem = o.from(table)
        .select(c => [c.x])
        .limit(1)
        .as("test");

    const query = o.select(() => [
        selectItem
    ]);

    t.true(o.AliasedTableUtil.isAliasedTable(selectItem));
    t.true(o.ExprSelectItemUtil.isExprSelectItem(selectItem));

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