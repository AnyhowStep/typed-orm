import * as sd from "schema-decorator";
import * as tape from "tape";
import * as o from "../../../../dist/src/main";

tape(__filename, (t) => {
    const columnMap = o.ColumnMapUtil.fromFieldArray(
        "someTable",
        [
            sd.field("x", sd.naturalNumber()),
            sd.field("y", sd.date()),
            sd.field("z", sd.buffer()),
        ]
    );

    t.true(o.ColumnMapUtil.isColumnMap(columnMap));
    t.true(Object.keys(columnMap).length == 3);

    t.true(o.Column.isColumn(columnMap.x));
    t.true(o.Column.isColumn(columnMap.y));
    t.true(o.Column.isColumn(columnMap.z));

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