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
            w : sd.naturalNumber(),
        }
    );

    t.throws(() => {
        o.from(table)
            .select(((c : any) => [
                o.eq(c.x, c.w).as("duplicate"),
                o.eq(c.w, c.x).as("duplicate")
            ]) as any);
    });
    t.end();
});