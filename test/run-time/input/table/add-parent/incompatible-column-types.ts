import * as sd from "schema-decorator";
import * as tape from "tape";
import * as o from "../../../../../dist/src/main";

tape(__filename, (t) => {
    const parent = o.table(
        "parent",
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
                x : sd.nullable(sd.naturalNumber()),
                y : sd.string(),
                z : sd.boolean(),
            }
        ).addCandidateKey(c => [c.x])
        /*
            The problem here is that we can't really have a run-time check
            for this...

            If one took `string` and the other took `number`,
            how would we know?

            We only have "one is nullable, the other is not" tests
        */
        .addParent(parent as any);
    });

    t.end();
});