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

const other = o.table(
    "other",
    {
        a : sd.naturalNumber(),
        b : sd.nullable(sd.string()),
        c : sd.boolean(),
    }
).addCandidateKey(c => [c.a, c.b]);

export const query = o.from(table)
    .whereEqCandidateKey(other, {
        a : 56,
        b : "23"
    });