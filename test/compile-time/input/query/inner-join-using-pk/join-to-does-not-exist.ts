import * as sd from "schema-decorator";
import * as o from "../../../../../dist/src/main";

const table = o.table(
    "table",
    {
        x : sd.naturalNumber(),
        y : sd.string(),
        z : sd.boolean(),
        a : sd.date(),
    }
);
const joined1 = o.table(
    "joined1",
    {
        a : sd.date(),
        b : sd.buffer(),
        c : sd.string()
    }
).setPrimaryKey(c => [c.a, c.b])

export const query = o.from(table)
    .innerJoinUsingPk(
        t => t.table,
        joined1
    );