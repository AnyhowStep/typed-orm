import * as sd from "schema-decorator";
import * as tape from "tape";
import * as o from "../../../../../dist/src/main";

tape(__filename, (t) => {
    const table = o.table(
        "table",
        {
            x : sd.naturalNumber(),
            y : sd.nullable(sd.string()),
            z : sd.boolean(),
        }
    ).addCandidateKey(c => [c.x, c.y]);

    const other = o.table(
        "other",
        {
            a : sd.naturalNumber(),
            b : sd.nullable(sd.string()),
            c : sd.boolean(),
        }
    ).addCandidateKey(c => [c.a, c.b]);

    t.throws(() => {
        o.from(table)
            .whereEqCandidateKey(other as unknown as typeof table, {
                a : 56,
                b : "23"
            } as unknown as { x : number, y : string });
    });

    t.end();
});