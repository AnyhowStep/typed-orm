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
            x : sd.buffer(),
            y : sd.string()
        }
    ).setPrimaryKey(c => [c.x]);

    t.doesNotThrow(() => {
        /*
            Even though they are different data types,
            this still runs because we don't know the
            types at run time.

            This could be solved by adding run-time information.
        */
        o.innerJoinUsingPk(
            table,
            joined1 as any
        );
    });
    t.end();
});