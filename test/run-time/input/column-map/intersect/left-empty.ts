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

    const intersect = o.ColumnMapUtil.intersect(
        columnMapA,
        columnMapB
    );

    t.true(o.ColumnMapUtil.isColumnMap(intersect));
    t.deepEqual(Object.keys(intersect).length, 4);

    t.deepEqual(intersect.commonA.tableAlias, "someTableB");
    t.deepEqual(intersect.commonA.name, "commonA");
    t.throws(() => {
        intersect.commonA.assertDelegate("", 0);
    });
    t.doesNotThrow(() => {
        intersect.commonA.assertDelegate("", "hi");
    });

    t.deepEqual(intersect.commonB.tableAlias, "someTableB");
    t.deepEqual(intersect.commonB.name, "commonB");
    t.throws(() => {
        intersect.commonB.assertDelegate("", new Date());
    });
    t.doesNotThrow(() => {
        intersect.commonB.assertDelegate("", true);
    });
    t.doesNotThrow(() => {
        intersect.commonB.assertDelegate("", false);
    });

    t.deepEqual(intersect.commonC.tableAlias, "someTableB");
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

    t.deepEqual(intersect.differentB.tableAlias, "someTableB");
    t.deepEqual(intersect.differentB.name, "differentB");
    t.doesNotThrow(() => {
        intersect.differentB.assertDelegate("", null);
    });

    t.end();
});
