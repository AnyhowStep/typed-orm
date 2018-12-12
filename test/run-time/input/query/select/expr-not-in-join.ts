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
    const otherTable = o.table(
        "otherTable",
        {
            x : sd.naturalNumber(),
            y : sd.string(),
            z : sd.boolean(),
        }
    );

    t.throws(() => {
        o.from(table)
            .select(((c : any) => [
                o.eq(
                    c.x,
                    otherTable.columns.x
                ).as("equal?")
            ]) as any);
    });
    t.end();
});