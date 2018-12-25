import * as sd from "schema-decorator";
import * as o from "../../../../../dist/src/main";
import * as tape from "tape";

tape(__filename, (t) => {
    const table = o.table(
        "table",
        {
            x : sd.naturalNumber(),
            y : sd.string(),
            z : sd.boolean(),
        }
    );
    const joined1 = o.table(
        "joined1",
        {
            a : sd.date(),
            b : sd.number(),
            y : sd.string()
        }
    );

    const j1 = o.innerJoin(
        table,
        joined1,
        t => [t.x],
        t => [t.b]
    );
    t.throws(() => {
        o.from(table)
            .useJoin(j1)
            .useJoin(j1 as any);
    });

    t.end();
});