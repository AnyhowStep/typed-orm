import * as sd from "schema-decorator";
import * as tape from "tape";
import * as o from "../../../../src/main";

tape(__filename, (t) => {
    const c = new o.Column(
        {
            tableAlias : "tableAlias",
            name : "name",
            assertDelegate : sd.naturalNumber()
        },
        undefined,
        undefined
    );
    const identifier = c.toColumnIdentifier();

    t.deepEqual(o.Column.isColumn(identifier), false);
    t.deepEqual(c.tableAlias, "tableAlias");
    t.deepEqual(c.name, "name");

    t.end();
});