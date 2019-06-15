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
            a : sd.unsignedInteger(),
            b : sd.string(),
            c : sd.boolean()
        }
    );

    const other = o.table(
        "other",
        {
            x : sd.unsignedInteger(),
            y : sd.string(),
            z : sd.boolean(),
            a : sd.unsignedInteger(),
            b : sd.string(),
            //This is missing
            //c : sd.boolean(),
        }
    );

    t.throws(() => {
        o.from(table)
            .select(c => [c])
            .union(
                o.from(other)
                    .select(c => [o.eq(c.x, c.x).as("test")]) as any
            );
    });

    t.end();
});