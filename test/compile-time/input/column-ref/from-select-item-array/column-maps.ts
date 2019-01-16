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
const table2 = o.table(
    "table2",
    {
        x : sd.naturalNumber(),
        y : sd.string(),
        z : sd.boolean(),
    }
);

export const query = o.from(table)
    .innerJoinUsing(
        table2,
        c => [c.x]
    )
    .select(c => [
        c.table,
        c.table2
    ]);
export const ref = o.ColumnRefUtil.fromSelectItemArray(query._selects);