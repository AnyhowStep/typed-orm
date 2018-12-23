import * as sd from "schema-decorator";
import * as o from "../../../../../dist/src/main";

const joined1 = o.table(
    "joined1",
    {
        a : sd.date(),
        b : sd.number(),
        y : sd.string(),
        c : sd.string(),
        d : sd.string(),
    }
).addCandidateKey(c => [c.y]);

joined1.addCandidateKey(c => [c.y]);
joined1.addCandidateKey(c => [c.y, c.b]);