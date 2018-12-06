import * as sd from "schema-decorator";
import * as o from "../../../../../dist/src/main";

const table = o.table(
    "table",
    {
        x : sd.naturalNumber(),
        y : sd.string(),
        z : sd.boolean(),
        w : sd.naturalNumber(),
    }
);

export const query = o.QueryUtil.select(
    o.from(table),
    c => [
        o.eq(c.x, c.w).as("equal?")
    ]
);