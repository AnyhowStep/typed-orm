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
        b : sd.number(),
        y : sd.string()
    }
);
const joined2 = o.table(
    "joined2",
    {
        a : sd.date(),
        b : sd.nullable(sd.number()),
        y : sd.string()
    }
);

const j2 = o.innerJoinUsing(
    joined1,
    joined2,
    t => [t.b]
);
export const query = o.from(table)
    .useJoin(j2);