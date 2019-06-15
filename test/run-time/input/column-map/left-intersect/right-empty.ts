import * as sd from "type-mapping";
import * as tape from "tape";
import * as o from "../../../../../src/main";

tape(__filename, (t) => {
    const columnMapA = o.ColumnMapUtil.fromAssertMap(
        "someTableA",
        {
            commonA : sd.unsignedInteger(),
            commonB : sd.mysql.dateTime(3),
            commonC : sd.orNull(sd.boolean()),
            differentA : sd.instanceOfBuffer(),
        }
    );

    const columnMapB = o.ColumnMapUtil.fromAssertMap(
        "someTableB",
        {}
    );

    const leftIntersect = o.ColumnMapUtil.leftIntersect(
        columnMapA,
        columnMapB
    );

    t.true(o.ColumnMapUtil.isColumnMap(leftIntersect));
    t.deepEqual(Object.keys(leftIntersect).length, 4);

    t.deepEqual(leftIntersect.commonA.tableAlias, "someTableA");
    t.deepEqual(leftIntersect.commonA.name, "commonA");
    t.doesNotThrow(() => {
        leftIntersect.commonA.assertDelegate("", 0);
    });
    t.throws(() => {
        leftIntersect.commonA.assertDelegate("", "hi");
    });

    t.deepEqual(leftIntersect.commonB.tableAlias, "someTableA");
    t.deepEqual(leftIntersect.commonB.name, "commonB");
    t.doesNotThrow(() => {
        leftIntersect.commonB.assertDelegate("", new Date());
    });
    t.throws(() => {
        leftIntersect.commonB.assertDelegate("", true);
    });
    t.throws(() => {
        leftIntersect.commonB.assertDelegate("", false);
    });

    t.deepEqual(leftIntersect.commonC.tableAlias, "someTableA");
    t.deepEqual(leftIntersect.commonC.name, "commonC");
    t.doesNotThrow(() => {
        leftIntersect.commonC.assertDelegate("", null);
    });
    t.doesNotThrow(() => {
        leftIntersect.commonC.assertDelegate("", true);
    });
    t.doesNotThrow(() => {
        leftIntersect.commonC.assertDelegate("", false);
    });

    t.deepEqual(leftIntersect.differentA.tableAlias, "someTableA");
    t.deepEqual(leftIntersect.differentA.name, "differentA");
    t.doesNotThrow(() => {
        leftIntersect.differentA.assertDelegate("", Buffer.from("hello"));
    });

    t.end();
});
