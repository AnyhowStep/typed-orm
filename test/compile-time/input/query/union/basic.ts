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
    .select(c => [c.z, c.x, c.y])
    .union(
        o.from(table)
            .select(c => [c.z, c.x, c.y])
    )
    .union(
        o.from(table)
            .select(c => [c.c, c.a, c.b])
    )
    .union(
        o.DISTINCT,
        o.from(table)
            .select(c => [c.c, c.a, c.b])
    )
    .union(
        o.ALL,
        o.from(table)
            .select(c => [c.c, c.a, c.b])
    );