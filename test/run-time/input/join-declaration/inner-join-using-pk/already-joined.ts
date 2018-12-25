import * as sd from "schema-decorator";
import * as o from "../../../../../dist/src/main";
import * as tape from "tape";

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
            x : sd.number(),
            y : sd.string()
        }
    ).setPrimaryKey(c => [c.x]);

    const j1 = o.innerJoinUsingPk(
        table,
        joined1
    );
    t.throws(() => {
        o.from(table)
            .useJoin(j1)
            .useJoin(j1 as any);
    });

    t.end();
});