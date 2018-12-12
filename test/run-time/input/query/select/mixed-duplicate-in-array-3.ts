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
        }
    );

    t.throws(() => {
        o.from(table)
            .select(((c : any) => [c, c.y.as("x")]) as any);
    });
    t.end();
});