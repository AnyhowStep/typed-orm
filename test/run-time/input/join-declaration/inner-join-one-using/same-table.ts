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
    ).addCandidateKey(c => [c.x]);

    t.throws(() => {
        o.innerJoinCkUsing(
            table,
            table as any,
            () => [table.columns.x]
        );
    });
    t.end();
});