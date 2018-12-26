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
).setPrimaryKey(c => [c.x]);

const j1 = o.innerJoinFromPk(
    joined1,
    table
);
export const query = o.from(joined1)
    .useJoin(j1)
    .useJoin(j1);