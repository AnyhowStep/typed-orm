import * as sd from "schema-decorator";
import * as o from "../../../../../dist/src/main";

const table = o.table(
    "table",
    {
        x : sd.naturalNumber(),
        y : sd.string(),
        z : sd.boolean(),
        b : sd.buffer(),
        w : sd.number(),
    }
);
const joined1 = o.table(
    "joined1",
    {
        a : sd.date(),
        b : sd.buffer(),
        y : sd.string(),
        w : sd.number(),
    }
).addCandidateKey(c => [c.y, c.b])
.addCandidateKey(c => [c.b, c.a])

export const query = o.from(table)
    .innerJoinCkUsing(
        joined1,
        c => [c.b, c.y]
    );