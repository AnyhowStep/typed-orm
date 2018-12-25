import * as sd from "schema-decorator";
import * as o from "../../../../../dist/src/main";

const table = o.table(
    "table",
    {
        x : sd.date(),
        y : sd.string(),
        z : sd.boolean(),
    }
);
const joined1 = o.table(
    "joined1",
    {
        a : sd.date(),
        b : sd.date(),
        y : sd.string()
    }
);

const j1 = o.innerJoin(
    table,
    joined1,
    t => [t.x],
    t => [t.b]
);
const j2 = o.innerJoin(
    joined1,
    table,
    t => [t.a, t.y],
    t => [t.x, t.y]
);
export const query = o.from(table)
    .useJoins(j1, j2);