import * as sd from "type-mapping";
import * as tape from "tape";
import * as o from "../../../../../dist/src/main";

tape(__filename, (t) => {
    const joined1 = o.table(
        "joined1",
        {
            a : sd.mysql.dateTime(3),
            b : sd.finiteNumber(),
            y : sd.string(),
            c : sd.string(),
            d : sd.string(),
        }
    ).addCandidateKey(c => [c.y])
    .addCandidateKey(c => [c.c, c.d]);

    t.throws(() => {
        joined1.setAutoIncrement((c => ((c as any).y as typeof c.b)));
    });
    t.throws(() => {
        joined1.setAutoIncrement((c => ((c as any).c as typeof c.b)));
    });
    t.throws(() => {
        joined1.setAutoIncrement((c => ((c as any).d as typeof c.b)));
    });

    t.end();
});