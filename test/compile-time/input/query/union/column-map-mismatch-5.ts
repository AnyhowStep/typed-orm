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

const other = o.table(
    "other",
    {
        x : sd.naturalNumber(),
        y : sd.string(),
        z : sd.boolean(),
        a : sd.naturalNumber(),
        b : sd.string(),
        //This is missing
        //c : sd.boolean(),
    }
);

export const query = o.from(table)
    .select(c => [c])
    .union(
        o.from(other)
            .select(c => [o.eq(c.x, c.x).as("test")])
    );