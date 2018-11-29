import * as sd from "schema-decorator";
import * as tape from "tape";
import * as o from "../../../../../src/main";

tape(__filename, (t) => {
    const columnMapA = o.ColumnMapUtil.fromAssertMap(
        "someTableA",
        {}
    );

    const columnMapB = o.ColumnMapUtil.fromAssertMap(
        "someTableB",
        {
            commonA : sd.string(),
            commonB : sd.boolean(),
            commonC : sd.boolean(),
            differentB : sd.nil(),
        }
    );

    const leftIntersect = o.ColumnMapUtil.leftIntersect(
        columnMapA,
        columnMapB
    );

    t.true(o.ColumnMapUtil.isColumnMap(leftIntersect));
    t.deepEqual(Object.keys(leftIntersect).length, 0);

    t.end();
});
