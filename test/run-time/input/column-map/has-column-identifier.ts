import * as sd from "schema-decorator";
import * as tape from "tape";
import * as o from "../../../../src/main";

tape(__filename, (t) => {
    const columnMap = o.ColumnMapUtil.fromAssertMap(
        "someTable",
        {
            x : sd.naturalNumber(),
            y : sd.date(),
            z : sd.buffer(),
        }
    );

    t.true(o.ColumnMapUtil.hasColumnIdentifier(
        columnMap,
        {
            tableAlias : "someTable",
            name : "x",
        }
    ));
    t.true(o.ColumnMapUtil.hasColumnIdentifier(
        columnMap,
        {
            tableAlias : "someTable",
            name : "y",
        }
    ));
    t.true(o.ColumnMapUtil.hasColumnIdentifier(
        columnMap,
        {
            tableAlias : "someTable",
            name : "z",
        }
    ));
    t.false(o.ColumnMapUtil.hasColumnIdentifier(
        columnMap,
        {
            tableAlias : "someTablegygyjgjhghjghjgjh",
            name : "x",
        }
    ));
    t.false(o.ColumnMapUtil.hasColumnIdentifier(
        columnMap,
        {
            tableAlias : "someTable",
            name : "xjghjgjhg",
        }
    ));

    t.end();
});

tape(__filename + "-empty", (t) => {
    const columnMap = o.ColumnMapUtil.fromAssertMap(
        "someTable",
        {}
    );

    t.false(o.ColumnMapUtil.hasColumnIdentifier(
        columnMap,
        {
            tableAlias : "someTablegygyjgjhghjghjgjh",
            name : "x",
        }
    ));
    t.false(o.ColumnMapUtil.hasColumnIdentifier(
        columnMap,
        {
            tableAlias : "someTable",
            name : "xjghjgjhg",
        }
    ));

    t.end();
});