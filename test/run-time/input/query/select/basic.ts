import * as sd from "schema-decorator";
import * as tape from "tape";
import * as o from "../../../../../dist/src/main";

tape(__filename, (t) => {
    const table = o.table(
        "table",
        {
            x : sd.naturalNumber(),
            y : sd.string(),
            z : sd.boolean(),
        }
    );

    const query = o.from(table)
        .select(c => [c.z, c.x, c.y]);

    t.true(o.SelectItemArrayUtil.isSelectItemArray(query.selects));
    t.deepEqual(query.selects.length, 3);

    t.deepEqual(query.selects[0], table.columns.z);
    t.deepEqual(query.selects[1], table.columns.x);
    t.deepEqual(query.selects[2], table.columns.y);

    t.end();
});