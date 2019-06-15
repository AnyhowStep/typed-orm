import * as sd from "type-mapping";
import * as tape from "tape";
import * as o from "../../../../../dist/src/main";

tape(__filename, (t) => {
    const parent = o.table(
        "parent",
        {
            x : sd.unsignedInteger(),
            y : sd.string(),
            z : sd.boolean(),
        }
    ).addCandidateKey(c => [c.x]);

    t.throws(() => {
        o.table(
            "table",
            {
                x : sd.unsignedInteger(),
                y : sd.string(),
                z : sd.boolean(),
            }
        ).addCandidateKey(c => [c.x])
        .addParent(parent)
        .addParent(parent as any);
    });

    t.end();
});