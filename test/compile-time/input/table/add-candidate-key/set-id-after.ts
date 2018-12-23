import * as sd from "schema-decorator";
import * as o from "../../../../../dist/src/main";

const joined1 = o.table(
    "joined1",
    {
        a : sd.date(),
        b : sd.buffer(),
        y : sd.string(),
        c : sd.string(),
        d : sd.string(),
    }
).addCandidateKey(c => [c.y])
.addCandidateKey(c => [c.c, c.d]);

joined1.setId(c => c.y);
joined1.setId(c => c.c);
joined1.setId(c => c.d);

export const i = joined1.setId(c => c.b);