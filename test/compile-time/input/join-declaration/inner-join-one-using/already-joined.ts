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
        y : sd.string()
    }
).addCandidateKey(c => [c.x]);

const j1 = o.innerJoinCkUsing(
    table,
    joined1,
    t => [t.x]
);
export const query = o.from(table)
    .useJoin(j1)
    .useJoin(j1);