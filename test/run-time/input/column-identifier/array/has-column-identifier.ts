import * as sd from "schema-decorator";
import * as tape from "tape";
import * as o from "../../../../../dist/src/main";

tape(__filename, (t) => {
    const columnMap = o.ColumnMapUtil.fromAssertMap(
        "someTable",
        {
            x : sd.naturalNumber(),
            y : sd.date(),
            z : sd.buffer(),
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