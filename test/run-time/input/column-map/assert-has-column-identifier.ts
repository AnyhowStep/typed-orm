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

    t.doesNotThrow(() => {
        o.ColumnMapUtil.assertHasColumnIdentifier(
            columnMap,
            {
                tableAlias : "someTable",
                name : "x",
            }
        )
    });
    t.doesNotThrow(() => {
        o.ColumnMapUtil.assertHasColumnIdentifier(
            columnMap,
            {
                tableAlias : "someTable",
                name : "y",
            }
        )
    });
    t.doesNotThrow(() => {
        o.ColumnMapUtil.assertHasColumnIdentifier(
            columnMap,
            {
                tableAlias : "someTable",
                name : "z",
            }
        )
    });
    t.throws(() => {
        o.ColumnMapUtil.assertHasColumnIdentifier(
            columnMap,
            {
                tableAlias : "someTablegygyjgjhghjghjgjh",
                name : "x",
            }
        )
    });
    t.throws(() => {
        o.ColumnMapUtil.assertHasColumnIdentifier(
            columnMap,
            {
                tableAlias : "someTable",
                name : "xjghjgjhg",
            }
        )
    });

    t.end();
});

tape(__filename + "-empty", (t) => {
    const columnMap = o.ColumnMapUtil.fromAssertMap(
        "someTable",
        {}
    );

    t.throws(() => {
        o.ColumnMapUtil.assertHasColumnIdentifier(
            columnMap,
            {
                tableAlias : "someTablegygyjgjhghjghjgjh",
                name : "x",
            }
        )
    });
    t.throws(() => {
        o.ColumnMapUtil.assertHasColumnIdentifier(
            columnMap,
            {
                tableAlias : "someTable",
                name : "xjghjgjhg",
            }
        )
    });

    t.end();
});