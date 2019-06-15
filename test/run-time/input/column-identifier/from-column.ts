import * as sd from "type-mapping";
import * as tape from "tape";
import * as o from "../../../../dist/src/main";

tape(__filename, (t) => {
    const c = new o.Column(
        {
            tableAlias : "tableAlias",
            name : "name",
            assertDelegate : sd.unsignedInteger()
        },
        undefined
    );
    const identifier = o.ColumnIdentifierUtil.fromColumn(c);

    t.deepEqual(o.ColumnUtil.isColumn(identifier), false);
    t.deepEqual(c.tableAlias, "tableAlias");
    t.deepEqual(c.name, "name");

    t.end();
});