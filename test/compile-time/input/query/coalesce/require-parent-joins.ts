import * as sd from "schema-decorator";
import * as o from "../../../../../dist/src/main";

const parent = o.table(
    "parent",
    {
        a : sd.naturalNumber(),
        b : sd.string(),
        c : sd.boolean(),
    }
);
const table = o.table(
    "table",
    {
        x : sd.naturalNumber(),
        y : sd.string(),
        z : sd.boolean(),
    }
);

export const coalesced = o.requireParentJoins(parent)
    .from(table)
    .select(c => [c.table.x])
    .limit(1)
    .coalesce(32);