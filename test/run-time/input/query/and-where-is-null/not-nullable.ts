import * as sd from "schema-decorator";
import * as tape from "tape";
import * as o from "../../../../../dist/src/main";

tape(__filename, (t) => {
    const table = o.table(
        "table",
        {
            x : sd.naturalNumber(),
            y : sd.nullable(sd.string()),
            z : sd.boolean(),
        }
    );

    t.throws(() => {
        o.from(table)
            .whereIsNull(c => c.x as unknown as typeof c.y);
    });

    t.end();
});