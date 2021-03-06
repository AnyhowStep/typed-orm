import * as sd from "type-mapping";
import * as o from "../../../../../dist/src/main";
import * as tape from "tape";

tape(__filename, (t) => {
    const table = o.table(
        "table",
        {
            x : sd.unsignedInteger(),
            y : sd.string(),
            z : sd.boolean(),
        }
    );
    const joined1 = o.table(
        "joined1",
        {
            a : sd.mysql.dateTime(3),
            x : sd.instanceOfBuffer(),
            y : sd.string()
        }
    );

    t.doesNotThrow(() => {
        /*
            Even though they are different data types,
            this still runs because we don't know the
            types at run time.

            This could be solved by adding run-time information.
        */
        o.innerJoinUsing(
            table,
            joined1,
            (t : any) => [t.x] as any
        );
    });
    t.end();
});