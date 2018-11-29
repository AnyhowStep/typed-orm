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

    t.false(o.ColumnMapUtil.hasOneColumn(columnMap));

    t.end();
});

tape(__filename + "-empty", (t) => {
    const columnMap = o.ColumnMapUtil.fromAssertMap(
        "someTable",
        {}
    );

    t.false(o.ColumnMapUtil.hasOneColumn(columnMap));

    t.end();
});


tape(__filename + "-unit", (t) => {
    const columnMap = o.ColumnMapUtil.fromAssertMap(
        "someTable",
        {
            x : sd.naturalNumber(),
        }
    );

    t.true(o.ColumnMapUtil.hasOneColumn(columnMap));

    t.end();
});