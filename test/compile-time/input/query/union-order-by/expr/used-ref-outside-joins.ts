import * as sd from "schema-decorator";
import * as o from "../../../../../../dist/src/main";
const table = o.table(
    "table",
    {
        x : sd.naturalNumber(),
        y : sd.string(),
        z : sd.boolean(),
    }
);
const table2 = o.table(
    "table2",
    {
        x : sd.naturalNumber(),
        y : sd.string(),
        z : sd.boolean(),
    }
);

export const query = o.from(table)
    .select(c => [c.z])
    .orderBy(c => [
        o.eq(table2.columns.z, c.z)
    ]);