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

    t.deepEqual(
        c.tableAlias,
        "tableAlias"
    );

    const c2 = c.withTableAlias("otherAlias");
    t.deepEqual(
        c2.tableAlias,
        "otherAlias"
    );

    t.end();
});