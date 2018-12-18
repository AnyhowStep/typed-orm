import * as sd from "schema-decorator";
import * as o from "../../../../../dist/src/main";

const table = o.table(
    "table",
    {
        x : sd.nullable(sd.naturalNumber()),
        y : sd.string(),
        z : sd.boolean(),
        a : sd.naturalNumber(),
        b : sd.string(),
        c : sd.boolean()
    }
);

const table2 = o.table(
    "table2",
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
    .select(c => [c])
    .union(
        o.from(table)
            .select(c => [c])
    )
    .union(
        o.from(table2)
            .select(c => [c])
    )
    .union(
        o.DISTINCT,
        o.from(table)
            .select(c => [c])
    )
    .union(
        o.ALL,
        o.from(table2)
            .select(c => [c])
    );