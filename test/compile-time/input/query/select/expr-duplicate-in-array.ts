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
export const query = o.from(table)
    .select(c => [
        o.eq(c.x, c.w).as("duplicate"),
        o.eq(c.w, c.x).as("duplicate")
    ]);