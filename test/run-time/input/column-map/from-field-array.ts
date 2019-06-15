import * as sd from "type-mapping";
import * as tape from "tape";
import * as o from "../../../../dist/src/main";

tape(__filename, (t) => {
    const columnMap = o.ColumnMapUtil.fromFieldArray(
        "someTable",
        [
            sd.withName(sd.unsignedInteger(), "x"),
            sd.withName(sd.mysql.dateTime(3), "y"),
            sd.withName(sd.instanceOfBuffer(), "z"),
        ]
    );

    t.true(o.ColumnMapUtil.isColumnMap(columnMap));
    t.true(Object.keys(columnMap).length == 3);

    t.true(o.ColumnUtil.isColumn(columnMap.x));
    t.true(o.ColumnUtil.isColumn(columnMap.y));
    t.true(o.ColumnUtil.isColumn(columnMap.z));

    t.deepEqual(columnMap.x.tableAlias, "someTable");
    t.deepEqual(columnMap.y.tableAlias, "someTable");
    t.deepEqual(columnMap.z.tableAlias, "someTable");

    t.deepEqual(columnMap.x.name, "x");
    t.deepEqual(columnMap.y.name, "y");
    t.deepEqual(columnMap.z.name, "z");


    const emptyColumnMap = o.ColumnMapUtil.fromFieldArray(
        "someEmptyTable",
        []
    );

    t.true(o.ColumnMapUtil.isColumnMap(emptyColumnMap));
    t.true(Object.keys(emptyColumnMap).length == 0);

    t.end();
});