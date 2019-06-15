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
            c : sd.boolean(),
            //This is extra
            extraField : sd.unsignedInteger(),
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