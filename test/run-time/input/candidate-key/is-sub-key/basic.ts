import * as tape from "tape";
import * as o from "../../../../../dist/src/main";

tape(__filename, (t) => {
    t.true(o.KeyUtil.isSubKey(
        [],
        []
    ));
    t.true(o.KeyUtil.isSubKey(
        [],
        ["a"]
    ));
    t.true(o.KeyUtil.isSubKey(
        [],
        ["a", "b"]
    ));


    t.false(o.KeyUtil.isSubKey(
        ["a"],
        []
    ));
    t.false(o.KeyUtil.isSubKey(
        ["a", "b"],
        []
    ));
    t.end();
});