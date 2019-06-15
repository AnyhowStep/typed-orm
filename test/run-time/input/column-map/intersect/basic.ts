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
        {
            commonA : sd.string(),
            commonB : sd.boolean(),
            commonC : sd.boolean(),
            differentB : sd.null(),
        }
    );

    const intersect = o.ColumnMapUtil.intersect(
        columnMapA,
        columnMapB
    );

    t.true(o.ColumnMapUtil.isColumnMap(intersect));
    t.deepEqual(Object.keys(intersect).length, 5);

    t.deepEqual(intersect.commonA.tableAlias, "someTableA");
    t.deepEqual(intersect.commonA.name, "commonA");
    t.throws(() => {
        intersect.commonA.assertDelegate("", 0);
    });
    t.throws(() => {
        intersect.commonA.assertDelegate("", "hi");
    });

    t.deepEqual(intersect.commonB.tableAlias, "someTableA");
    t.deepEqual(intersect.commonB.name, "commonB");
    t.throws(() => {
        intersect.commonB.assertDelegate("", new Date());
    });
    t.throws(() => {
        intersect.commonB.assertDelegate("", true);
    });
    t.throws(() => {
        intersect.commonB.assertDelegate("", false);
    });

    t.deepEqual(intersect.commonC.tableAlias, "someTableA");
    t.deepEqual(intersect.commonC.name, "commonC");
    t.throws(() => {
        intersect.commonC.assertDelegate("", null);
    });
    t.doesNotThrow(() => {
        intersect.commonC.assertDelegate("", true);
    });
    t.doesNotThrow(() => {
        intersect.commonC.assertDelegate("", false);
    });

    t.deepEqual(intersect.differentA.tableAlias, "someTableA");
    t.deepEqual(intersect.differentA.name, "differentA");
    t.doesNotThrow(() => {
        intersect.differentA.assertDelegate("", Buffer.from("hello"));
    });

    t.deepEqual(intersect.differentB.tableAlias, "someTableB");
    t.deepEqual(intersect.differentB.name, "differentB");
    t.doesNotThrow(() => {
        intersect.differentB.assertDelegate("", null);
    });

    t.end();
});
