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
const otherTable = o.table(
    "table",
    {
        a : sd.date(),
        b : sd.buffer(),
        c : sd.string()
    }
);
export const query = o.from(table)
    .groupBy(() => [otherTable.columns.a]);