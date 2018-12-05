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
    const joined1 = o.table(
        "joined1",
        {
            a : sd.date(),
            b : sd.buffer(),
            c : sd.string()
        }
    )

    t.throws(() => {
        (o.QueryUtil.newInstance() as any)
            .leftJoin(
                joined1,
                () => [table.columns.y],
                () => [joined1.columns.c]
            );
    });

    t.end();
});