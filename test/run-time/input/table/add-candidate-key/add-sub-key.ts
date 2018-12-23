import * as sd from "schema-decorator";
import * as tape from "tape";
import * as o from "../../../../../dist/src/main";

tape(__filename, (t) => {
    const joined1 = o.table(
        "joined1",
        {
            a : sd.date(),
            b : sd.number(),
            y : sd.string(),
            c : sd.string(),
            d : sd.string(),
        }
    ).addCandidateKey(c => [c.y, c.b]);

    t.throws(() => {
        joined1.addCandidateKey(c => ([c.y] as any as [typeof c.a]));
    });
    t.throws(() => {
        joined1.addCandidateKey(c => ([c.y, c.b] as any as [typeof c.a]));
    });

    t.end();
});