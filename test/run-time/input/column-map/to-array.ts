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

    const arr = o.ColumnMapUtil.toArray(columnMap);
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

    const arr = o.ColumnMapUtil.toArray(columnMap);
    t.deepEqual(arr.length, 0);

    t.end();
});