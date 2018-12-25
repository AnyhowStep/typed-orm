import * as sd from "schema-decorator";
import * as o from "../../../../../dist/src/main";

const table = o.table(
    "table",
    {
        x : sd.naturalNumber(),
        y : sd.string(),
        z : sd.boolean(),
    }
).setPrimaryKey(c => [c.x]);

export const j1 = o.innerJoinUsingPk(
    table,
    table
);