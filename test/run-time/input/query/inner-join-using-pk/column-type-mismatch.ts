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
    const joined1 = o.table(
        "joined1",
        {
            y : sd.mysql.dateTime(3),
            b : sd.instanceOfBuffer(),
            c : sd.string()
        }
    ).setPrimaryKey(c => [c.y])

    /*
        NOTICE THAT THIS *DOES NOT* THROW!
        table.y is string
        table.y is Date

        However, we can't have a reasonable run-time check
        to see if they're assignable.
        So, this *will* run.
    */
    t.doesNotThrow(() => {
        o.from(table)
            .innerJoinPk(
                t => t.table,
                joined1 as any
            );
    });

    t.end();
});