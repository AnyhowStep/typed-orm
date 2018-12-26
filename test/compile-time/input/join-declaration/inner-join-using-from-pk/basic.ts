import * as sd from "schema-decorator";
import * as o from "../../../../../dist/src/main";

const table = o.table(
    "table",
    {
        b : sd.naturalNumber(),
        y : sd.string(),
        z : sd.boolean(),
    }
);
const joined1 = o.table(
    "joined1",
    {
        a : sd.date(),
        b : sd.number(),
        y : sd.string()
    }
).setPrimaryKey(c => [c.b, c.y]);

export const j1 = o.innerJoinUsingFromPk(
    joined1,
    table
);