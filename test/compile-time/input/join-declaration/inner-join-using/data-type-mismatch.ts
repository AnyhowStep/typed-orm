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
        x : sd.buffer(),
        c : o.bigint()
    }
);

export const j1 = o.innerJoinUsing(
    table,
    joined1,
    t => [t.x]
);