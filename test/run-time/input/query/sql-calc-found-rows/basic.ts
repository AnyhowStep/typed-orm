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
        .select(c => [c.z, c.x, c.y])
        .sqlCalcFoundRows();

    t.true(o.SelectItemArrayUtil.isSelectItemArray(query._selects));
    t.deepEqual(query._selects.length, 3);

    t.deepEqual(query._selects[0], table.columns.z);
    t.deepEqual(query._selects[1], table.columns.x);
    t.deepEqual(query._selects[2], table.columns.y);

    t.deepEqual(query._distinct, false);
    t.deepEqual(query._sqlCalcFoundRows, true);

    t.end();
});