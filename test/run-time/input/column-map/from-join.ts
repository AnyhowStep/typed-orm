import * as sd from "schema-decorator";
import * as tape from "tape";
import * as o from "../../../../dist/src/main";

tape(__filename, (t) => {
    const table = o.table(
        "t",
        {
            x : sd.naturalNumber(),
            y : sd.string(),
        }
    );
    const j = new o.Join(
        {
            aliasedTable : table,
            columns : table.columns,
            nullable : false,
        },
        o.JoinType.FROM,
        [],
        []
    );
    const columnMap = o.ColumnMapUtil.fromJoin(j);

    t.true(o.ColumnMapUtil.isColumnMap(columnMap));
    t.true(Object.keys(columnMap).length == 2);

    t.true(o.Column.isColumn(columnMap.x));
    t.true(o.Column.isColumn(columnMap.y));

    t.deepEqual(columnMap.x.tableAlias, "t");
    t.deepEqual(columnMap.y.tableAlias, "t");

    t.deepEqual(columnMap.x.name, "x");
    t.deepEqual(columnMap.y.name, "y");

    t.throws(() => {
        columnMap.x.assertDelegate("", null);
    });
    t.deepEqual(columnMap.x.assertDelegate("", 42), 42);

    t.throws(() => {
        columnMap.y.assertDelegate("", null);
    });
    t.deepEqual(columnMap.y.assertDelegate("", "hey"), "hey");

    t.end();
});

tape(__filename + "-nullable", (t) => {
    const table = o.table(
        "t",
        {
            x : sd.naturalNumber(),
            y : sd.string(),
        }
    );
    const j = new o.Join(
        {
            aliasedTable : table,
            columns : table.columns,
            nullable : true,
        },
        o.JoinType.FROM,
        [],
        []
    );
    const columnMap = o.ColumnMapUtil.fromJoin(j);

    t.true(o.ColumnMapUtil.isColumnMap(columnMap));
    t.true(Object.keys(columnMap).length == 2);

    t.true(o.Column.isColumn(columnMap.x));
    t.true(o.Column.isColumn(columnMap.y));

    t.deepEqual(columnMap.x.tableAlias, "t");
    t.deepEqual(columnMap.y.tableAlias, "t");

    t.deepEqual(columnMap.x.name, "x");
    t.deepEqual(columnMap.y.name, "y");

    t.deepEqual(columnMap.x.assertDelegate("", null), null);
    t.deepEqual(columnMap.x.assertDelegate("", 42), 42);

    t.deepEqual(columnMap.y.assertDelegate("", null), null);
    t.deepEqual(columnMap.y.assertDelegate("", "hey"), "hey");

    t.end();
});