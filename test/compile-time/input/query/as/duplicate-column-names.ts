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

const parent = o.table(
    "parent",
    {
        x : sd.buffer(),
        y : sd.buffer(),
        z : sd.buffer(),
    }
);
export const aliased = o.from(table)
    .requireParentJoins(parent)
    .select(c => [c.table.x, c.parent.x])
    .as("aliased");