import * as tape from "tape";
import * as o from "../../../../../dist/src/main";

tape(__filename, (t) => {
    t.true(o.CandidateKeyUtil.isSubKey(
        [],
        []
    ));
    t.true(o.CandidateKeyUtil.isSubKey(
        [],
        ["a"]
    ));
    t.true(o.CandidateKeyUtil.isSubKey(
        [],
        ["a", "b"]
    ));


    t.false(o.CandidateKeyUtil.isSubKey(
        ["a"],
        []
    ));
    t.false(o.CandidateKeyUtil.isSubKey(
        ["a", "b"],
        []
    ));
    t.end();
});