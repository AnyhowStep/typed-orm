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

    const nullable = o.ColumnMapUtil.toNullable(columnMap);
    t.deepEqual(Object.keys(nullable).length, 3);

    t.deepEqual(
        nullable.x.assertDelegate("", null),
        null
    );
    t.deepEqual(
        nullable.x.assertDelegate("", 32),
        32
    );
    t.deepEqual(nullable.x.tableAlias, "someTable");
    t.deepEqual(nullable.x.name, "x");
    t.deepEqual(
        nullable.y.assertDelegate("", null),
        null
    );
    t.deepEqual(
        nullable.y.assertDelegate("", new Date("2000-01-01")),
        new Date("2000-01-01")
    );
    t.deepEqual(nullable.y.tableAlias, "someTable");
    t.deepEqual(nullable.y.name, "y");
    t.deepEqual(
        nullable.z.assertDelegate("", null),
        null
    );
    t.deepEqual(
        nullable.z.assertDelegate("", Buffer.from("hey")),
        Buffer.from("hey")
    );
    t.deepEqual(nullable.z.tableAlias, "someTable");
    t.deepEqual(nullable.z.name, "z");

    t.end();
});

tape(__filename + "-empty", (t) => {
    const columnMap = o.ColumnMapUtil.fromAssertMap(
        "someTable",
        {}
    );

    const nullable = o.ColumnMapUtil.toNullable(columnMap);
    t.deepEqual(Object.keys(nullable).length, 0);

    t.end();
});

tape(__filename + "-mixed", (t) => {
    const columnMap = o.ColumnMapUtil.intersect(
        o.ColumnMapUtil.fromAssertMap(
            "tableA",
            {
                ax : sd.unsignedInteger(),
                ay : sd.string(),
            }
        ),
        o.ColumnMapUtil.fromAssertMap(
            "tableB",
            {
                bx : sd.boolean(),
                by : sd.instanceOfBuffer(),
            }
        )
    );

    const nullable = o.ColumnMapUtil.toNullable(columnMap);
    t.deepEqual(Object.keys(nullable).length, 4);

    t.deepEqual(
        nullable.ax.assertDelegate("", null),
        null
    );
    t.deepEqual(
        nullable.ax.assertDelegate("", 32),
        32
    );
    t.deepEqual(nullable.ax.tableAlias, "tableA");
    t.deepEqual(nullable.ax.name, "ax");
    t.deepEqual(
        nullable.ay.assertDelegate("", null),
        null
    );
    t.deepEqual(
        nullable.ay.assertDelegate("", "Boo"),
        "Boo"
    );
    t.deepEqual(nullable.ay.tableAlias, "tableA");
    t.deepEqual(nullable.ay.name, "ay");

    t.deepEqual(
        nullable.bx.assertDelegate("", null),
        null
    );
    t.deepEqual(
        nullable.bx.assertDelegate("", true),
        true
    );
    t.deepEqual(
        nullable.bx.assertDelegate("", false),
        false
    );
    t.deepEqual(nullable.bx.tableAlias, "tableB");
    t.deepEqual(nullable.bx.name, "bx");
    t.deepEqual(
        nullable.by.assertDelegate("", null),
        null
    );
    t.deepEqual(
        nullable.by.assertDelegate("", Buffer.from("Bah")),
        Buffer.from("Bah")
    );
    t.deepEqual(nullable.by.tableAlias, "tableB");
    t.deepEqual(nullable.by.name, "by");

    t.end();
});