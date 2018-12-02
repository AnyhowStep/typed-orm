import * as sd from "schema-decorator";
import * as tape from "tape";
import * as o from "../../../../../dist/src/main";

tape(__filename, (t) => {
    const parent = o.table(
        "parent",
        {
            x : sd.naturalNumber(),
            w : sd.date(),
        }
    ).addCandidateKey(c => [c.x]);

    const table = o.table(
        "table",
        {
            x : sd.naturalNumber(),
            y : sd.string(),
            z : sd.boolean(),
        }
    ).addCandidateKey(c => [c.x])
    .addParent(parent);

    t.deepEqual(table.parents.length, 1);
    t.equal(table.parents[0], parent);

    t.end();
});