import * as sd from "type-mapping";
import * as tape from "tape";
import * as o from "../../../../../dist/src/main";

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
            b : sd.instanceOfBuffer(),
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
                c => [c.table.y],
                t => [t.c]
            );
    });

    t.end();
});