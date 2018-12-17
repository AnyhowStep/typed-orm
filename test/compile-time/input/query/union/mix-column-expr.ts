import * as sd from "schema-decorator";
import * as o from "../../../../../dist/src/main";

const table = o.table(
    "table",
    {
        x : sd.naturalNumber(),
        y : sd.string(),
        z : sd.boolean(),
        a : sd.naturalNumber(),
        b : sd.string(),
        c : sd.boolean()
    }
);

export const query = o.from(table)
    .select(c => [c.z, c.x, c.y, o.eq(c.x, c.a).as("lol")])
    .union(
        o.from(table)
            .select(c => [o.eq(c.y, c.b).as("test"), c.x, c.y, c.z])
    )
    .union(
        o.from(table)
            .select(c => [c.c, c.a, c.b, c.c.as("other")])
    )
    .union(
        o.DISTINCT,
        o.from(table)
            .select(c => [c.c, c.a, c.b, c.z])
    )
    .union(
        o.ALL,
        o.from(table)
            .select(c => [c.c, c.a, c.b, o.and(c.c, c.z).as("thing")])
    );