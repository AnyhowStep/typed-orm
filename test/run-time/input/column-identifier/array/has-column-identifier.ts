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
    t.true(o.ColumnIdentifierUtil.Array.hasColumnIdentifier(
        arr,
        { tableAlias : "someTable", name : "x" }
    ));
    t.true(o.ColumnIdentifierUtil.Array.hasColumnIdentifier(
        arr,
        { tableAlias : "someTable", name : "x", extraField : "test" }
    ));
    t.false(o.ColumnIdentifierUtil.Array.hasColumnIdentifier(
        arr,
        { tableAlias : "someTable2", name : "x"}
    ));
    t.false(o.ColumnIdentifierUtil.Array.hasColumnIdentifier(
        arr,
        { tableAlias : "someTable", name : "www"}
    ));
    t.false(o.ColumnIdentifierUtil.Array.hasColumnIdentifier(
        arr,
        { tableAlias : "someTable2", name : "www"}
    ));

    t.end();
});