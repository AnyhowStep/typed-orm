import * as tape from "tape";
import * as o from "../../../../../dist/src/main";

tape(__filename, (t) => {
    t.true(o.KeyUtil.isKey([]));
    t.true(o.KeyUtil.isKey([
        "column-name"
    ]));
    t.true(o.KeyUtil.isKey([
        "column-name",
        "column-name-2"
    ]));
    t.true(o.KeyUtil.isKey([
        "column-name-duplicate",
        "column-name-duplicate",
        "column-name-2",
        "column-name-duplicate",
    ]));

    t.false(o.KeyUtil.isKey([
        123
    ]));
    t.false(o.KeyUtil.isKey([
        true
    ]));
    t.false(o.KeyUtil.isKey([
        false
    ]));
    t.false(o.KeyUtil.isKey([
        123n
    ]));
    t.false(o.KeyUtil.isKey([
        null
    ]));
    t.false(o.KeyUtil.isKey([
        undefined
    ]));
    t.false(o.KeyUtil.isKey([
        new Date()
    ]));
    t.false(o.KeyUtil.isKey([
        () => {}
    ]));

    t.false(o.KeyUtil.isKey([
        "column-name",
        123
    ]));
    t.false(o.KeyUtil.isKey([
        "column-name",
        true
    ]));
    t.false(o.KeyUtil.isKey([
        "column-name",
        false
    ]));
    t.false(o.KeyUtil.isKey([
        "column-name",
        123n
    ]));
    t.false(o.KeyUtil.isKey([
        "column-name",
        null
    ]));
    t.false(o.KeyUtil.isKey([
        "column-name",
        undefined
    ]));
    t.false(o.KeyUtil.isKey([
        "column-name",
        new Date()
    ]));
    t.false(o.KeyUtil.isKey([
        "column-name",
        () => {}
    ]));

    t.false(o.KeyUtil.isKey(
        123
    ));
    t.false(o.KeyUtil.isKey(
        true
    ));
    t.false(o.KeyUtil.isKey(
        false
    ));
    t.false(o.KeyUtil.isKey(
        123n
    ));
    t.false(o.KeyUtil.isKey(
        null
    ));
    t.false(o.KeyUtil.isKey(
        undefined
    ));
    t.false(o.KeyUtil.isKey(
        new Date()
    ));
    t.false(o.KeyUtil.isKey(
        () => {}
    ));

    t.end();
});