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
            w : sd.mysql.dateTime(3),
        }
    ).addCandidateKey(c => [
        c.x,
        c.y,
        c.x,
        c.y,
    ]).addCandidateKey(c => [
        c.y,
        c.z,
        c.z,
    ]);
    t.throws(() => {
        table.addCandidateKey(c => [
            c.x,
            c.y,
            c.y,
        ] as any as [typeof c.w]);
    });
    t.throws(() => {
        table.addCandidateKey(c => [
            c.x,
            c.y,
            c.z,
        ] as any as [typeof c.w]);
    });
    t.throws(() => {
        table.addCandidateKey(c => [
            c.x,
        ] as any as [typeof c.w]);
    });
    t.throws(() => {
        table.addCandidateKey(c => [
            c.y,
        ] as any as [typeof c.w]);
    });
    t.throws(() => {
        table.addCandidateKey(c => [
            c.z,
        ] as any as [typeof c.w]);
    });
    t.doesNotThrow(() => {
        table.addCandidateKey(c => [
            c.x, c.z,
        ]);
    });

    t.deepEqual(table.candidateKeys[0].length, 2);
    t.true((table.candidateKeys[0] as string[]).indexOf("x") >= 0);
    t.true((table.candidateKeys[0] as string[]).indexOf("y") >= 0);

    t.deepEqual(table.candidateKeys[1].length, 2);
    t.true((table.candidateKeys[1] as string[]).indexOf("y") >= 0);
    t.true((table.candidateKeys[1] as string[]).indexOf("z") >= 0);

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