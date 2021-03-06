import * as sd from "type-mapping";
import * as tape from "tape";
import * as o from "../../../../../dist/src/main";

tape(__filename, (t) => {
    const columnMap = o.ColumnMapUtil.fromAssertMap(
        "someTable",
        {
            x : sd.unsignedInteger(),
            y : sd.mysql.dateTime(3),
            z : sd.instanceOfBuffer(),
        }
    );

    const arr = o.ColumnIdentifierUtil.Array.fromColumnMap(columnMap);
    t.deepEqual(arr.length, 3);

    t.deepEqual(
        arr.find(identifier => (
            identifier.tableAlias == columnMap.x.tableAlias &&
            identifier.name == columnMap.x.name
        )),
        {
            tableAlias : "someTable",
            name : "x",
        }
    );
    t.deepEqual(
        arr.find(identifier => (
            identifier.tableAlias == columnMap.y.tableAlias &&
            identifier.name == columnMap.y.name
        )),
        {
            tableAlias : "someTable",
            name : "y",
        }
    );
    t.deepEqual(
        arr.find(identifier => (
            identifier.tableAlias == columnMap.z.tableAlias &&
            identifier.name == columnMap.z.name
        )),
        {
            tableAlias : "someTable",
            name : "z",
        }
    );

    t.end();
});

tape(__filename + "-empty", (t) => {
    const columnMap = o.ColumnMapUtil.fromAssertMap(
        "someTable",
        {}
    );

    const arr = o.ColumnIdentifierUtil.Array.fromColumnMap(columnMap);
    t.deepEqual(arr.length, 0);

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

    const arr = o.ColumnIdentifierUtil.Array.fromColumnMap(columnMap);
    t.deepEqual(arr.length, 4);

    t.deepEqual(
        arr.find(identifier => (
            identifier.tableAlias == columnMap.ax.tableAlias &&
            identifier.name == columnMap.ax.name
        )),
        {
            tableAlias : "tableA",
            name : "ax",
        }
    );
    t.deepEqual(
        arr.find(identifier => (
            identifier.tableAlias == columnMap.ay.tableAlias &&
            identifier.name == columnMap.ay.name
        )),
        {
            tableAlias : "tableA",
            name : "ay",
        }
    );
    t.deepEqual(
        arr.find(identifier => (
            identifier.tableAlias == columnMap.bx.tableAlias &&
            identifier.name == columnMap.bx.name
        )),
        {
            tableAlias : "tableB",
            name : "bx",
        }
    );
    t.deepEqual(
        arr.find(identifier => (
            identifier.tableAlias == columnMap.by.tableAlias &&
            identifier.name == columnMap.by.name
        )),
        {
            tableAlias : "tableB",
            name : "by",
        }
    );

    t.end();
});