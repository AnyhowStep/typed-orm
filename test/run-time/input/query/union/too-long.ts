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
            a : sd.naturalNumber(),
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