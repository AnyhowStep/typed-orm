import * as sd from "schema-decorator";
import * as tape from "tape";
import * as o from "../../../../../dist/src/main";

tape(__filename, (t) => {
    const joined1 = o.table(
        "joined1",
        {
            a : sd.date(),
            b : sd.buffer(),
            y : sd.string(),
            c : sd.string(),
            d : sd.string(),
        }
    ).setPrimaryKey(c => [c.y])
    .setPrimaryKey(c => [c.c, c.d]);

    t.throws(() => {
        joined1.setId((c => ((c as any).y as any as typeof c.b)));
    });
    t.throws(() => {
        joined1.setId((c => ((c as any).c as typeof c.b)));
    });
    t.throws(() => {
        joined1.setId((c => ((c as any).d as typeof c.b)));
    });

    t.end();
});