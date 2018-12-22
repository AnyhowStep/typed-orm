import * as sd from "schema-decorator";
import * as o from "../../../../../dist/src/main";

const parent = o.table(
    "parent",
    {
        a : sd.buffer(),
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

export const aliased = o.from(table)
    .requireParentJoins(parent)
    .select(c => [c.table.z, c.table.x, c.table.y, c.parent.a])
    .as("aliased");