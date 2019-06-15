import * as sd from "type-mapping";
import * as tape from "tape";
import * as o from "../../../../../dist/src/main";

tape(__filename, (t) => {
    const table = o.table(
        "table",
        {
            x : sd.unsignedInteger(),
            y : sd.orNull(sd.string()),
            z : sd.boolean(),
        }
    ).addCandidateKey(c => [c.x, c.y])
    .addCandidateKey(c => [c.y, c.z]);;

    t.throws(() => {
        o.from(table)
            .whereEqCandidateKey(table, {
                x : 56,
            } as unknown as { x : number, y : string });
    });
    t.throws(() => {
        o.from(table)
            .whereEqCandidateKey(table, {
                y : "23",
            } as unknown as { x : number, y : string });
    });
    t.throws(() => {
        o.from(table)
            .whereEqCandidateKey(table, {
                z : true,
            } as unknown as { x : number, y : string });
    });

    t.end();
});