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
        c : sd.string()
    }
);
const joined2 = o.table(
    "joined2",
    {
        j : sd.date(),
        k : sd.buffer(),
        l : sd.string()
    }
);
const joined3 = o.table(
    "joined3",
    {
        d : sd.date(),
        e : sd.buffer(),
        f : sd.string()
    }
);

export const query = o.from(table)
    .rightJoin(
        joined1,
        c => [c.y],
        t => [t.c]
    );

export const query2 = o.from(table)
    .innerJoin(
        joined1,
        c => [c.y],
        t => [t.c]
    )
    .leftJoin(
        joined2,
        c => [c.table.y, c.joined1.a],
        t => [t.l, t.j]
    )
    .rightJoin(
        joined3,
        c => [c.table.y, c.joined1.a, c.joined2.k],
        t => [t.f, t.d, t.e]
    );