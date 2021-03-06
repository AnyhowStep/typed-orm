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

export const j1 = o.innerJoin(
    table,
    table,
    () => [table.columns.x],
    () => [table.columns.x]
);