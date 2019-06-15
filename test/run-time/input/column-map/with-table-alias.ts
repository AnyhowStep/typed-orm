import * as sd from "type-mapping";
import * as tape from "tape";
import * as o from "../../../../dist/src/main";

tape(__filename, (t) => {
    const columnMap = o.ColumnMapUtil.fromAssertMap(
        "someTable",
        {
            x : sd.unsignedInteger(),
            y : sd.mysql.dateTime(3),
            z : sd.instanceOfBuffer(),
        }
    );

    const withTableAlias = o.ColumnMapUtil.withTableAlias(
        columnMap,
        "someAlias"
    );

    t.true(o.ColumnMapUtil.isColumnMap(withTableAlias));
    t.true(Object.keys(withTableAlias).length == 3);

    t.deepEqual(
        withTableAlias.x.tableAlias,
        "someAlias"
    );
    t.deepEqual(
        withTableAlias.x.tableAlias,
        "someAlias"
    );
    t.deepEqual(
        withTableAlias.y.tableAlias,
        "someAlias"
    );
    t.deepEqual(
        withTableAlias.x.name,
        "x"
    );
    t.deepEqual(
        withTableAlias.y.name,
        "y"
    );
    t.deepEqual(
        withTableAlias.z.name,
        "z"
    );

    t.end();
});

tape(__filename + "-empty", (t) => {
    const columnMap = o.ColumnMapUtil.fromAssertMap(
        "someTable",
        {}
    );

    const withTableAlias = o.ColumnMapUtil.withTableAlias(
        columnMap,
        "someAlias"
    );

    t.true(o.ColumnMapUtil.isColumnMap(withTableAlias));
    t.true(Object.keys(withTableAlias).length == 0);

    t.end();
});


tape(__filename + "-unit", (t) => {
    const columnMap = o.ColumnMapUtil.fromAssertMap(
        "someTable",
        {
            x : sd.unsignedInteger(),
        }
    );

    const withTableAlias = o.ColumnMapUtil.withTableAlias(
        columnMap,
        "someAlias"
    );

    t.true(o.ColumnMapUtil.isColumnMap(withTableAlias));
    t.true(Object.keys(withTableAlias).length == 1);

    t.deepEqual(
        withTableAlias.x.tableAlias,
        "someAlias"
    );
    t.deepEqual(
        withTableAlias.x.name,
        "x"
    );

    t.end();
});