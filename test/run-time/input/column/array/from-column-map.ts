import * as sd from "type-mapping";
import * as tape from "tape";
import * as o from "../../../../../dist/src/main";

tape(__filename, (t) => {
    const columnMap = o.ColumnMapUtil.fromAssertMap(
        "someTable",
        {
            x : sd.unsignedInteger(),
            y : sd.mysql.dateTime(3),
            z : sd.instanceOfBuffer(),
        }
    );

    const arr = o.ColumnUtil.Array.fromColumnMap(columnMap);
    t.deepEqual(arr.length, 3);
    t.true(arr.indexOf(columnMap.x) >= 0);
    t.true(arr.indexOf(columnMap.y) >= 0);
    t.true(arr.indexOf(columnMap.z) >= 0);

    t.end();
});

tape(__filename + "-empty", (t) => {
    const columnMap = o.ColumnMapUtil.fromAssertMap(
        "someTable",
        {}
    );

    const arr = o.ColumnUtil.Array.fromColumnMap(columnMap);
    t.deepEqual(arr.length, 0);

    t.end();
});

tape(__filename + "-mixed", (t) => {
    const columnMap = o.ColumnMapUtil.intersect(
        o.ColumnMapUtil.fromAssertMap(
            "tableA",
            {
                ax : sd.unsignedInteger(),
                ay : sd.string(),
            }
        ),
        o.ColumnMapUtil.fromAssertMap(
            "tableB",
            {
                bx : sd.boolean(),
                by : sd.instanceOfBuffer(),
            }
        )
    );

    const arr = o.ColumnUtil.Array.fromColumnMap(columnMap);
    t.deepEqual(arr.length, 4);
    t.true(arr.indexOf(columnMap.ax) >= 0);
    t.true(arr.indexOf(columnMap.ay) >= 0);
    t.true(arr.indexOf(columnMap.bx) >= 0);
    t.true(arr.indexOf(columnMap.by) >= 0);

    t.end();
});