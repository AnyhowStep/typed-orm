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

export const aliased = o.QueryUtil.as(
    o.from(table)
        .select(c => [c.z, c.x, c.y]),
    "aliased"
);