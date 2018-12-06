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
        b : sd.buffer(),
        y : sd.string()
    }
);
const joined2 = o.table(
    "joined2",
    {
        a : sd.date(),
        b : sd.buffer(),
        y : sd.string()
    }
);

export const query = o.from(table)
    .rightJoinUsing(
        joined1,
        c => [c.y]
    )
    .rightJoinUsing(
        joined2,
        c => [c.joined1.a]
    );