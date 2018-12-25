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
    ).setId(c => c.y)

    t.throws(() => {
        joined1.setPrimaryKey(c => [c.y] as any as [typeof c.b]);
    });
    t.throws(() => {
        joined1.setPrimaryKey(c => [c.y, c.d] as any as [typeof c.b]);
    });

    t.end();
});