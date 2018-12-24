import * as tape from "tape";
import * as o from "../../../../../../../dist/src/main";
import * as fs from "fs";

tape(__filename, (t) => {
    const selectItem = o.select(() => [o.utcTimestamp().as("now")])
        .as("test");

    const query = o.select(() => [
        selectItem
    ]);

    t.true(o.AliasedTable.isAliasedTable(selectItem));
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