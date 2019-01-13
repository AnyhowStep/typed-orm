import * as tape from "tape";
import * as o from "../../../../../dist/src/main";

tape(__filename, (t) => {
    t.true(o.KeyUtil.isEqual(
        [],
        []
    ));
    t.true(o.KeyUtil.isEqual(
        ["a", "b"],
        ["a", "b"]
    ));
    t.true(o.KeyUtil.isEqual(
        ["a", "b"],
        ["b", "a"]
    ));
    t.true(o.KeyUtil.isEqual(
        ["a", "b", "a"],
        ["b", "a"]
    ));
    t.true(o.KeyUtil.isEqual(
        ["a", "b", "a", "b"],
        ["b", "a"]
    ));
    t.true(o.KeyUtil.isEqual(
        ["a", "b", "a", "b"],
        ["b", "a", "b", "b"]
    ));
    t.true(o.KeyUtil.isEqual(
        ["a", "b", "a", "b"],
        ["b", "a", "b", "b", "b"]
    ));
    t.true(o.KeyUtil.isEqual(
        ["a", "b", "a", "b", "a", "a"],
        ["b", "a", "b", "b", "b"]
    ));

    t.true(o.KeyUtil.isEqual(
        ["a", "c", "a", "b", "a", "a"],
        ["b", "a", "b", "b", "c"]
    ));
    t.false(o.KeyUtil.isEqual(
        ["a", "b", "c"],
        ["a", "b"]
    ));
    t.false(o.KeyUtil.isEqual(
        ["a", "c", "b"],
        ["a", "b"]
    ));
    t.false(o.KeyUtil.isEqual(
        ["a", "b"],
        ["a", "b", "c"]
    ));
    t.false(o.KeyUtil.isEqual(
        ["a", "b"],
        ["a", "c", "b"]
    ));

    t.end();
});