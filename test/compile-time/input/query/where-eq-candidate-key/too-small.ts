import * as sd from "schema-decorator";
import * as o from "../../../../../dist/src/main";

const table = o.table(
    "table",
    {
        x : sd.naturalNumber(),
        y : sd.nullable(sd.string()),
        z : sd.boolean(),
    }
).addCandidateKey(c => [c.x, c.y]);

export const query = o.from(table)
    .whereEqCandidateKey(table, {
        x : 56,
    });