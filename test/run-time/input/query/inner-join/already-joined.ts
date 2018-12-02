import * as sd from "schema-decorator";
import * as tape from "tape";
import * as o from "../../../../../dist/src/main";

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
            b : sd.buffer(),
            c : sd.string()
        }
    )

    t.throws(() => {
        o.from(table)
            .innerJoin(
                joined1,
                c => [c.y],
                t => [t.c]
            )
            .innerJoin(
                joined1 as any,
                c => [c.y],
                t => [t.c]
            );
    });

    t.end();
});