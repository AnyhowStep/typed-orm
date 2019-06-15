import * as sd from "type-mapping";
import * as o from "../../../../../dist/src/main";
import * as tape from "tape";

tape(__filename, (t) => {
    const table = o.table(
        "table",
        {
            x : sd.unsignedInteger(),
            y : sd.string(),
            z : sd.boolean(),
        }
    );
    const joined1 = o.table(
        "joined1",
        {
            a : sd.mysql.dateTime(3),
            x : sd.finiteNumber(),
            y : sd.string()
        }
    ).addCandidateKey(c => [c.x, c.y]);

    t.throws(() => {
        o.innerJoinCkUsing(
            table,
            joined1,
            t => [t.x]
        );
    });

    t.end();
});