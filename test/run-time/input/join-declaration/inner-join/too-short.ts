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
            y : sd.boolean()
        }
    );

    t.throws(() => {
        o.innerJoin(
            table,
            joined1,
            t => [t.x, t.z],
            t => [t.b] as any
        );
    });
    t.end();
});