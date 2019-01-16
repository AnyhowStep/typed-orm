import * as sd from "schema-decorator";
import * as o from "../../../../../dist/src/main";

const table = o.table(
    "table",
    {
        x : sd.naturalNumber(),
        y : sd.string(),
        z : sd.boolean(),
    }
);

export const query = o.from(table)
    .select(c => [
        c.x,
        c.y,
        c.z
    ]);
export const ref = o.ColumnRefUtil.fromSelectItemArray(query._selects);