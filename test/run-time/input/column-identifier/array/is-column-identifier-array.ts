import * as sd from "type-mapping";
import * as tape from "tape";
import * as o from "../../../../../dist/src/main";

tape(__filename, (t) => {
    t.true(o.ColumnIdentifierUtil.Array.isColumnIdentifierArray([]));
    const columnMap = o.ColumnMapUtil.fromAssertMap(
        "someTable",
        {
            x : sd.unsignedInteger(),
            y : sd.mysql.dateTime(3),
            z : sd.instanceOfBuffer(),
        }
    );
    const arr = o.ColumnIdentifierUtil.Array.fromColumnMap(columnMap);
    t.true(o.ColumnIdentifierUtil.Array.isColumnIdentifierArray(arr));
    t.true(o.ColumnIdentifierUtil.Array.isColumnIdentifierArray([
        { tableAlias : "test", name : "testtest" }
    ]));
    t.false(o.ColumnIdentifierUtil.Array.isColumnIdentifierArray(
        true
    ));
    t.false(o.ColumnIdentifierUtil.Array.isColumnIdentifierArray(
        false
    ));
    t.false(o.ColumnIdentifierUtil.Array.isColumnIdentifierArray(
        new Date()
    ));
    t.false(o.ColumnIdentifierUtil.Array.isColumnIdentifierArray(
        23
    ));
    t.false(o.ColumnIdentifierUtil.Array.isColumnIdentifierArray(
        () => 2
    ));
    t.false(o.ColumnIdentifierUtil.Array.isColumnIdentifierArray(
        {}
    ));
    t.false(o.ColumnIdentifierUtil.Array.isColumnIdentifierArray(
        columnMap
    ));
    t.false(o.ColumnIdentifierUtil.Array.isColumnIdentifierArray([
        ...arr,
        "not-me",
    ]));

    t.end();
});