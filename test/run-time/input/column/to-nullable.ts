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

    t.throws(() => {
        c.assertDelegate("name", -1);
    });
    t.deepEqual(
        c.assertDelegate("name", 0),
        0
    );
    t.throws(() => {
        c.assertDelegate("name", null);
    });
    t.throws(() => {
        c.assertDelegate("name", undefined);
    });

    const c2 = c.toNullable();
    t.throws(() => {
        c2.assertDelegate("name", -1);
    });
    t.deepEqual(
        c2.assertDelegate("name", 0),
        0
    );
    t.deepEqual(
        c2.assertDelegate("name", null),
        null
    );
    t.throws(() => {
        c.assertDelegate("name", undefined);
    });

    t.end();
});