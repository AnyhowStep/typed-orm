import * as sd from "type-mapping";
import * as tape from "tape";
import * as o from "../../../../../dist/src/main";

tape(__filename, (t) => {
    const table = o.table(
        "table",
        {
            x : sd.unsignedInteger(),
            y : sd.orNull(sd.string()),
            z : sd.boolean(),
        }
    );

    t.throws(() => {
        o.from(table)
            .whereEq(c => c.y as unknown as typeof c.x, 42);
    });

    t.end();
});