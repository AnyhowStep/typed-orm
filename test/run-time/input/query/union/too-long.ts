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

    t.throws(() => {
        o.from(table)
            .select(c => [c.z, c.x, c.y])
            .union(
                o.from(table)
                    .select(c => [c.z, c.x, c.y, c.a]) as any
            );
    });

    t.end();
});