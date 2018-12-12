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
        .select(() => [table.columns.z, table.columns.x, table.columns.y]);

    t.deepEqual(query._selects.length, 3);

    t.deepEqual(query._selects[0], table.columns.z);
    t.deepEqual(query._selects[1], table.columns.x);
    t.deepEqual(query._selects[2], table.columns.y);

    t.end();
});