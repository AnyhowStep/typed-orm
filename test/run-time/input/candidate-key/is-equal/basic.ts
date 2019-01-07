import * as tape from "tape";
import * as o from "../../../../../dist/src/main";

tape(__filename, (t) => {
    t.true(o.CandidateKeyUtil.isEqual(
        [],
        []
    ));
    t.true(o.CandidateKeyUtil.isEqual(
        ["a", "b"],
        ["a", "b"]
    ));
    t.true(o.CandidateKeyUtil.isEqual(
        ["a", "b"],
        ["b", "a"]
    ));
    t.true(o.CandidateKeyUtil.isEqual(
        ["a", "b", "a"],
        ["b", "a"]
    ));
    t.true(o.CandidateKeyUtil.isEqual(
        ["a", "b", "a", "b"],
        ["b", "a"]
    ));
    t.true(o.CandidateKeyUtil.isEqual(
        ["a", "b", "a", "b"],
        ["b", "a", "b", "b"]
    ));
    t.true(o.CandidateKeyUtil.isEqual(
        ["a", "b", "a", "b"],
        ["b", "a", "b", "b", "b"]
    ));
    t.true(o.CandidateKeyUtil.isEqual(
        ["a", "b", "a", "b", "a", "a"],
        ["b", "a", "b", "b", "b"]
    ));

    t.true(o.CandidateKeyUtil.isEqual(
        ["a", "c", "a", "b", "a", "a"],
        ["b", "a", "b", "b", "c"]
    ));
    t.false(o.CandidateKeyUtil.isEqual(
        ["a", "b", "c"],
        ["a", "b"]
    ));
    t.false(o.CandidateKeyUtil.isEqual(
        ["a", "c", "b"],
        ["a", "b"]
    ));
    t.false(o.CandidateKeyUtil.isEqual(
        ["a", "b"],
        ["a", "b", "c"]
    ));
    t.false(o.CandidateKeyUtil.isEqual(
        ["a", "b"],
        ["a", "c", "b"]
    ));

    t.end();
});