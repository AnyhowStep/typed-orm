import * as sd from "schema-decorator";
import * as tape from "tape";
import * as o from "../../../../dist/src/main";

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