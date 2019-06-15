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
        c.assertDelegate("n", 0),
        0
    );
    t.deepEqual(
        c.assertDelegate("n", 1),
        1
    );
    t.deepEqual(
        c.assertDelegate("n", 2),
        2
    );
    t.throws(() => {
        c.assertDelegate("n", -1);
    });

    const c2 = c.withType(sd.mysql.varChar(3));
    t.deepEqual(
        c2.assertDelegate("s", ""),
        ""
    );
    t.deepEqual(
        c2.assertDelegate("s", "h"),
        "h"
    );
    t.deepEqual(
        c2.assertDelegate("s", "he"),
        "he"
    );
    t.deepEqual(
        c2.assertDelegate("s", "hel"),
        "hel"
    );
    t.throws(() => {
        c2.assertDelegate("s", "hell");
    });
    t.throws(() => {
        c2.assertDelegate("s", 0);
    });
    t.throws(() => {
        c2.assertDelegate("s", 1);
    });
    t.throws(() => {
        c2.assertDelegate("s", 2);
    });
    t.throws(() => {
        c2.assertDelegate("s", 3);
    });
    t.throws(() => {
        c2.assertDelegate("s", -1);
    });

    t.end();
});