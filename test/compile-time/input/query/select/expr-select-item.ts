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
const t = table.columns.x.as("test");
export const query = o.QueryUtil.select(
    o.from(table),
    c => [c.x.as("a"), c.y.as("b"), c.z.as("c")]
);