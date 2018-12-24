import * as sd from "schema-decorator";
import * as o from "../../../../../dist/src/main";

const table = o.table(
    "table",
    {
        x : sd.naturalNumber(),
        y : sd.nullable(sd.string()),
        z : sd.nullable(sd.boolean()),
    }
);

export const query = o.from(table)
    .whereEq(c => c.y, "hello");