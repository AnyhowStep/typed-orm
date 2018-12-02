import * as sd from "schema-decorator";
import * as tape from "tape";
import * as o from "../../../../dist/src/main";

tape(__filename, (t) => {
    const table = o.table(
        "table",
        {
            x : sd.naturalNumber(),
            y : sd.string(),
            z : sd.boolean(),
            w : sd.date(),
        }
    ).addCandidateKey(c => [
        c.x,
        c.y,
    ]).addCandidateKey(c => [
        c.y,
        c.z,
    ]);

    const ckad = table.candidateKeyAssertDelegate();
    t.deepEqual(
        ckad("", { x : 32, y : "test" }),
        { x : 32, y : "test" }
    );
    t.deepEqual(
        ckad("", { y : "rest", z : false }),
        { y : "rest", z : false }
    );
    t.deepEqual(
        ckad("", { y : "yarn" , z : true, w : new Date() }),
        { y : "yarn" , z : true }
    );
    t.throws(() => {
        ckad("", { z : false, w : new Date() });
    });


    const skad = table.superKeyAssertDelegate();
    t.deepEqual(
        skad("", { x : 32, y : "test" }),
        { x : 32, y : "test", z : undefined, w : undefined }
    );
    t.deepEqual(
        skad("", { y : "rest", z : false }),
        { x : undefined, y : "rest", z : false, w : undefined }
    );
    t.deepEqual(
        skad("", { y : "yarn" , z : true, w : new Date("1990-01-01") }),
        { x : undefined, y : "yarn" , z : true, w : new Date("1990-01-01") }
    );
    t.throws(() => {
        skad("", { z : false, w : new Date() });
    });

    t.end();
});