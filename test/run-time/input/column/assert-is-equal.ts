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
    const c2 = new o.Column(
        {
            tableAlias : "tableAliasDifferent",
            name : "name",
            assertDelegate : sd.naturalNumber()
        },
        undefined,
        undefined
    );
    const c3 = new o.Column(
        {
            tableAlias : "tableAlias",
            name : "nameDifferent",
            assertDelegate : sd.naturalNumber()
        },
        undefined,
        undefined
    );
    const c4 = new o.Column(
        {
            tableAlias : "tableAliasDifferent",
            name : "nameDifferent",
            assertDelegate : sd.naturalNumber()
        },
        undefined,
        undefined
    );
    //A different assertDelegate
    //isn't checked by assertIsEqual()
    const c5 = new o.Column(
        {
            tableAlias : "tableAlias",
            name : "name",
            //This is different
            assertDelegate : sd.string()
        },
        undefined,
        undefined
    );
    //A different __subTableName, __isInSelectClause
    //isn't checked by assertIsEqual()
    const c6 = new o.Column(
        {
            tableAlias : "tableAlias",
            name : "name",
            //This is different
            assertDelegate : sd.string()
        },
        "",
        true
    );

    t.throws(() => {
        c.assertIsEqual(c2);
    });
    t.throws(() => {
        c.assertIsEqual(c3);
    });
    t.throws(() => {
        c.assertIsEqual(c4);
    });
    t.doesNotThrow(() => {
        c.assertIsEqual(c5);
    });
    t.doesNotThrow(() => {
        c.assertIsEqual(c6);
    });

    t.end();
});