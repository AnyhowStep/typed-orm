import * as tape from "tape";
import * as o from "../../../../dist/src/main";

tape(__filename, (t) => {
    const table = o.table(
        "test",
        {
            x : o.bigint(),
            y : o.varChar(),
            z : o.boolean(),
        }
    );
    const map = o.ColumnIdentifierMapUtil.fromColumnMap(table.columns);
    t.deepEqual(
        map,
        {
            x: {
                tableAlias: "test",
                name: "x",
            },
            y: {
                tableAlias: "test",
                name: "y",
            },
            z: {
                tableAlias: "test",
                name: "z",
            },
        }
    );

    t.end();
});

tape(__filename, (t) => {
    const map = o.ColumnIdentifierMapUtil.fromColumnMap({});
    t.deepEqual(
        map,
        {}
    );

    t.end();
});

tape(__filename, (t) => {
    const table = o.table(
        "test",
        {
            x : o.bigint(),
            y : o.varChar(),
            z : o.boolean(),
        }
    );
    const table2 = o.table(
        "test2",
        {
            a : o.bigint(),
            b : o.varChar(),
            c : o.boolean(),
        }
    );
    const map = o.ColumnIdentifierMapUtil.fromColumnMap({
        ...table.columns,
        ...table2.columns,
    });
    t.deepEqual(
        map,
        {
            x: {
                tableAlias: "test",
                name: "x",
            },
            y: {
                tableAlias: "test",
                name: "y",
            },
            z: {
                tableAlias: "test",
                name: "z",
            },
            a: {
                tableAlias: "test2",
                name: "a",
            },
            b: {
                tableAlias: "test2",
                name: "b",
            },
            c: {
                tableAlias: "test2",
                name: "c",
            },
        }
    );

    t.end();
});
