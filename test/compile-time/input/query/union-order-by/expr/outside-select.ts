import * as sd from "schema-decorator";
import * as o from "../../../../../../dist/src/main";
const table = o.table(
    "table",
    {
        x : sd.naturalNumber(),
        y : sd.string(),
        z : sd.string(),
    }
);

export const query = o.from(table)
    .select(c => [c.z])
    .unionOrderBy(c => [
        o.eq(table.columns.y, c.z)
    ]);