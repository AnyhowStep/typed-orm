import * as sd from "schema-decorator";
import * as tape from "tape";
import * as o from "../../../../../dist/src/main";

tape(__filename, (t) => {
    const joined1 = o.table(
        "joined1",
        {
            a : sd.date(),
            b : sd.buffer(),
            y : sd.string()
        }
    )

    t.throws(() => {
        (o.QueryUtil.newInstance() as any)
            .crossJoin(
                joined1
            );
    });

    t.end();
});