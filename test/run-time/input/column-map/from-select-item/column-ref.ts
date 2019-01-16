import * as tape from "tape";
import * as o from "../../../../../dist/src/main";

tape(__filename, (t) => {
    const table = o.table(
        "test",
        {
            x : o.bigint(),
            y : o.varChar(),
            z : o.boolean(),
        }
    );
    const map = o.ColumnMapUtil.fromSelectItem({
        "test" : table.columns
    });
    t.deepEqual(
        map,
        table.columns
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
    const map = o.ColumnMapUtil.fromSelectItem({
        "test" : table.columns,
        "test2" : table2.columns
    });
    t.deepEqual(
        map,
        {
            ...table.columns,
            ...table2.columns,
        }
    );

    t.end();
});
