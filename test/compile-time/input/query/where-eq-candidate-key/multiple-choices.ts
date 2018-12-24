import * as sd from "schema-decorator";
import * as o from "../../../../../dist/src/main";

const table = o.table(
    "table",
    {
        x : sd.naturalNumber(),
        y : sd.nullable(sd.string()),
        z : sd.boolean(),
    }
).addCandidateKey(c => [c.x, c.y])
.addCandidateKey(c => [c.y, c.z]);;

export const query = o.from(table)
    .whereEqCandidateKey(table, {
        x : 56,
        y : "23"
    });
export const query2 = o.from(table)
    .whereEqCandidateKey(table, {
        y : "23",
        z : true
    });