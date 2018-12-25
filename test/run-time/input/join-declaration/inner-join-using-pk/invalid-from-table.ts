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
            b : sd.number(),
            y : sd.string()
        }
    );
    const joined2 = o.table(
        "joined2",
        {
            a : sd.date(),
            b : sd.nullable(sd.number()),
            y : sd.string()
        }
    ).setPrimaryKey(c => [c.a]);

    const j2 = o.innerJoinUsingPk(
        joined1,
        joined2
    );
    t.throws(() => {
        o.from(table)
            .useJoin(j2 as any);
    });

    t.end();
});