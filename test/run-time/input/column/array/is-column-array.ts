import * as tape from "tape";
import * as o from "../../../../../dist/src/main";

tape(__filename, (t) => {
    t.true(o.ColumnUtil.Array.isColumnArray([]));
    t.true(o.ColumnUtil.Array.isColumnArray([
        o.column("table", "column", o.bigint.nullable())
    ]));
    t.false(o.ColumnUtil.Array.isColumnArray(123));
    t.false(o.ColumnUtil.Array.isColumnArray([123]));
    t.false(o.ColumnUtil.Array.isColumnArray(() => []));

    t.end();
});