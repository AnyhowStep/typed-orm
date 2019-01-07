import * as sd from "schema-decorator";
import * as tape from "tape";
import * as o from "../../../../../../../dist/src/main";

tape(__filename, (t) => {
    const table = o.table(
        "table",
        {
            x : sd.naturalNumber(),
            y : sd.string(),
            z : sd.boolean(),
        }
    );

    const selectItem = o.from(table)
        .select(c => [c.x])
        .as("test");

    t.throws(() => {
        o.select((() => [
            selectItem
        ]) as any)
    });

    t.true(o.AliasedTableUtil.isAliasedTable(selectItem));
    t.false(o.ExprSelectItemUtil.isExprSelectItem(selectItem));

    t.end();
});