import * as sd from "schema-decorator";
import * as o from "../../../../../dist/src/main";

const table = o.table(
    "table",
    {
        x : sd.naturalNumber(),
        y : sd.string(),
        z : sd.boolean(),
        b : sd.buffer(),
    }
);
const joined1 = o.table(
    "joined1",
    {
        a : sd.date(),
        b : sd.buffer(),
        y : sd.string()
    }
).addCandidateKey(c => [c.y, c.b])


export const query = o.from(table)
    .innerJoinCkUsing(
        joined1,
        c => [c.b, c.y]
    );