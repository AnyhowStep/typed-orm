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

    const other = o.table(
        "other",
        {
            x : sd.naturalNumber(),
            y : sd.string(),
            z : sd.boolean(),
            a : sd.naturalNumber(),
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
                    .select(c => [c]) as any
            );
    });

    t.end();
});