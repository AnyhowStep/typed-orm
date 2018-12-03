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

    /*
        NOTICE THAT THIS *DOES NOT* THROW!
        y is string
        b is buffer

        However, we can't have a reasonable run-time check
        to see if they're assinable.
        So, this *will* run.
    */
    t.doesNotThrow(() => {
        o.from(table)
            .innerJoin(
                joined1,
                c => [c.y],
                t => [t.b as any]
            );
    });

    t.end();
});