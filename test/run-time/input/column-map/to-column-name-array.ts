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

    const arr = o.ColumnMapUtil.toColumnNameArray(columnMap);
    t.deepEqual(arr.length, 3);
    t.true(arr.indexOf(columnMap.x.name) >= 0);
    t.true(arr.indexOf(columnMap.y.name) >= 0);
    t.true(arr.indexOf(columnMap.z.name) >= 0);

    t.end();
});

tape(__filename + "-empty", (t) => {
    const columnMap = o.ColumnMapUtil.fromAssertMap(
        "someTable",
        {}
    );

    const arr = o.ColumnMapUtil.toColumnNameArray(columnMap);
    t.deepEqual(arr.length, 0);

    t.end();
});

tape(__filename + "-mixed", (t) => {
    const columnMap = o.ColumnMapUtil.intersect(
        o.ColumnMapUtil.fromAssertMap(
            "tableA",
            {
                ax : sd.naturalNumber(),
                ay : sd.string(),
            }
        ),
        o.ColumnMapUtil.fromAssertMap(
            "tableB",
            {
                bx : sd.boolean(),
                by : sd.buffer(),
            }
        )
    );

    const arr = o.ColumnMapUtil.toColumnNameArray(columnMap);
    t.deepEqual(arr.length, 4);

    t.true(arr.indexOf(columnMap.ax.name) >= 0);
    t.true(arr.indexOf(columnMap.ay.name) >= 0);
    t.true(arr.indexOf(columnMap.bx.name) >= 0);
    t.true(arr.indexOf(columnMap.by.name) >= 0);

    t.end();
});