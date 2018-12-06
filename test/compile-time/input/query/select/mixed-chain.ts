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
        a : sd.naturalNumber(),
        b : sd.string(),
        c : sd.boolean(),
    }
);

export const query = o.from(table)
    .select(c => [c.z])
    .select(c => [c.x.as("aliased")])
    .select(c => [o.eq(c.y, c.y).as("equal?"), c.x, c.y])
    .innerJoin(
        joined1,
        c => [c.z, c.y],
        t => [t.c, t.b]
    )
    .select(
        c => [c.joined1, o.eq(c.joined1.a, c.table.x).as("thisEqual?")]
    );