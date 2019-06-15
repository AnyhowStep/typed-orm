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
        }
    );

    const parent = o.table(
        "parent",
        {
            x : sd.instanceOfBuffer(),
            y : sd.instanceOfBuffer(),
            z : sd.instanceOfBuffer(),
        }
    );
    t.throws(() => {
        (
            o.from(table)
                .requireParentJoins(parent)
                .select(c => [c.table.x, c.parent.x]) as any
        )
            .as("aliased");
    });
    t.end();
});
