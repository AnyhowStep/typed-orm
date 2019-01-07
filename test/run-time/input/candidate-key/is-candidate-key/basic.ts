import * as tape from "tape";
import * as o from "../../../../../dist/src/main";

tape(__filename, (t) => {
    t.true(o.CandidateKeyUtil.isCandidateKey([]));
    t.true(o.CandidateKeyUtil.isCandidateKey([
        "column-name"
    ]));
    t.true(o.CandidateKeyUtil.isCandidateKey([
        "column-name",
        "column-name-2"
    ]));
    t.true(o.CandidateKeyUtil.isCandidateKey([
        "column-name-duplicate",
        "column-name-duplicate",
        "column-name-2",
        "column-name-duplicate",
    ]));

    t.false(o.CandidateKeyUtil.isCandidateKey([
        123
    ]));
    t.false(o.CandidateKeyUtil.isCandidateKey([
        true
    ]));
    t.false(o.CandidateKeyUtil.isCandidateKey([
        false
    ]));
    t.false(o.CandidateKeyUtil.isCandidateKey([
        123n
    ]));
    t.false(o.CandidateKeyUtil.isCandidateKey([
        null
    ]));
    t.false(o.CandidateKeyUtil.isCandidateKey([
        undefined
    ]));
    t.false(o.CandidateKeyUtil.isCandidateKey([
        new Date()
    ]));
    t.false(o.CandidateKeyUtil.isCandidateKey([
        () => {}
    ]));

    t.false(o.CandidateKeyUtil.isCandidateKey([
        "column-name",
        123
    ]));
    t.false(o.CandidateKeyUtil.isCandidateKey([
        "column-name",
        true
    ]));
    t.false(o.CandidateKeyUtil.isCandidateKey([
        "column-name",
        false
    ]));
    t.false(o.CandidateKeyUtil.isCandidateKey([
        "column-name",
        123n
    ]));
    t.false(o.CandidateKeyUtil.isCandidateKey([
        "column-name",
        null
    ]));
    t.false(o.CandidateKeyUtil.isCandidateKey([
        "column-name",
        undefined
    ]));
    t.false(o.CandidateKeyUtil.isCandidateKey([
        "column-name",
        new Date()
    ]));
    t.false(o.CandidateKeyUtil.isCandidateKey([
        "column-name",
        () => {}
    ]));

    t.false(o.CandidateKeyUtil.isCandidateKey(
        123
    ));
    t.false(o.CandidateKeyUtil.isCandidateKey(
        true
    ));
    t.false(o.CandidateKeyUtil.isCandidateKey(
        false
    ));
    t.false(o.CandidateKeyUtil.isCandidateKey(
        123n
    ));
    t.false(o.CandidateKeyUtil.isCandidateKey(
        null
    ));
    t.false(o.CandidateKeyUtil.isCandidateKey(
        undefined
    ));
    t.false(o.CandidateKeyUtil.isCandidateKey(
        new Date()
    ));
    t.false(o.CandidateKeyUtil.isCandidateKey(
        () => {}
    ));

    t.end();
});