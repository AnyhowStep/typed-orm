import * as sd from "schema-decorator";
import * as tape from "tape";
import * as o from "../../../../../dist/src/main";

tape(__filename, (t) => {
    const parent = o.table(
        "table",
        {
            x : sd.naturalNumber(),
            y : sd.string(),
            z : sd.boolean(),
        }
    ).addCandidateKey(c => [c.x]);

    t.throws(() => {
        o.table(
            "table",
            {
                x : sd.naturalNumber(),
                y : sd.string(),
                z : sd.boolean(),
            }
        ).addCandidateKey(c => [c.x])
        .addParent(parent as any);
    });

    t.end();
});