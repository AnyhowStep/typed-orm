import * as sd from "type-mapping";
import * as tape from "tape";
import * as o from "../../../../dist/src/main";

tape(__filename, (t) => {
    const columnMap = o.ColumnMapUtil.fromAssertMap(
        "someTable",
        {
            x : sd.unsignedInteger(),
            y : sd.mysql.dateTime(3),
            z : sd.instanceOfBuffer(),
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