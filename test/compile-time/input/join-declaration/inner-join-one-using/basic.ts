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
const joined1 = o.table(
    "joined1",
    {
        a : sd.date(),
        x : sd.number(),
        y : sd.string(),
        z : sd.boolean(),
    }
).addCandidateKey(c => [c.x, c.y]);

export const j1 = o.innerJoinOneUsing(
    table,
    joined1,
    t => [t.x, t.y]
);
export const query = o.from(table)
    .useJoin(j1);