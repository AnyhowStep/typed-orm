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
        y : sd.buffer(),
        z : sd.boolean()
    }
)

export const query = o.from(table)
    .innerJoinUsing(
        joined1,
        c => [c.y]
    );