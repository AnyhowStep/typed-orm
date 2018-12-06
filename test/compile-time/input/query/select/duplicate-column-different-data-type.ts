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
    //Intentionally named "table"
    "table",
    {
        x : sd.nullable(sd.naturalNumber()),
        y : sd.string(),
        z : sd.boolean(),
    }
);

export const query = o.from(table)
    .select(c => [c.x, table2.columns.x]);
export const query2 = o.from(table2)
    .select(c => [c.x, table.columns.x]);

const table3 = o.table(
    "table3",
    {
        x : sd.nullable(sd.naturalNumber()),
        y : sd.string(),
        z : sd.boolean(),
    }
);
export const query3 = o.from(table)
    .rightJoinUsing(
        table3,
        c => [c.x]
    )
    //This isn't allowed because after the RIGHT JOIN,
    //table.x is nullable.
    //But table.columns.x is still asserting NOT NULL.
    .select(c => [table.columns.x]);

export const query4 = o.from(table)
    .rightJoinUsing(
        table3,
        c => [c.x]
    )
    //OK
    .select(c => [c.table.x]);