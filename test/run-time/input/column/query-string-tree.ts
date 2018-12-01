import * as sd from "schema-decorator";
import * as tape from "tape";
import * as o from "../../../../dist/src/main";

tape(__filename, (t) => {
    t.deepEqual(
        new o.Column(
            {
                tableAlias : "tableAlias",
                name : "name",
                assertDelegate : sd.naturalNumber()
            },
            undefined,
            undefined
        ).queryStringTree(),
        "`tableAlias`.`name`"
    );
    t.deepEqual(
        new o.Column(
            {
                tableAlias : "tableAlias`",
                name : "name`",
                assertDelegate : sd.naturalNumber()
            },
            undefined,
            undefined
        ).queryStringTree(),
        "`tableAlias```.`name```"
    );

    /*
        When you want to write,
        (1 + 2) AS three

        You write,
        add(1, 2).as("three")

        This "three" is an IExprSelectItem but has no tableAlias
        associated with it.

        So, this library makes up a table alias that is very
        unlikely to be used naturally by others.
    */
    t.deepEqual(
        new o.Column(
            {
                tableAlias : o.ALIASED,
                name : "name`",
                assertDelegate : sd.naturalNumber()
            },
            undefined,
            undefined
        ).queryStringTree(),
        "`"+o.ALIASED+"--name```"
    );

    t.end();
});
tape(__filename + "-subtable-name", (t) => {
    t.deepEqual(
        new o.Column(
            {
                tableAlias : "tableAlias",
                name : "name",
                assertDelegate : sd.naturalNumber()
            },
            "subTable",
            undefined
        ).queryStringTree(),
        "`tableAlias`.`subTable--name`"
    );
    t.deepEqual(
        new o.Column(
            {
                tableAlias : "tableAlias`",
                name : "name`",
                assertDelegate : sd.naturalNumber()
            },
            "subTable`",
            undefined
        ).queryStringTree(),
        "`tableAlias```.`subTable``--name```"
    );
    /*
        TODO Is this correct?
        Do we ever encounter this case?
    */
    t.deepEqual(
        new o.Column(
            {
                tableAlias : o.ALIASED,
                name : "name`",
                assertDelegate : sd.naturalNumber()
            },
            "subTable`",
            undefined
        ).queryStringTree(),
        "`"+o.ALIASED+"--name```"
    );

    t.end();
});
tape(__filename + "-is-in-select-clause", (t) => {
    t.deepEqual(
        new o.Column(
            {
                tableAlias : "tableAlias",
                name : "name",
                assertDelegate : sd.naturalNumber()
            },
            undefined,
            true
        ).queryStringTree(),
        "`tableAlias--name`"
    );
    t.deepEqual(
        new o.Column(
            {
                tableAlias : "tableAlias`",
                name : "name`",
                assertDelegate : sd.naturalNumber()
            },
            undefined,
            true
        ).queryStringTree(),
        "`tableAlias``--name```"
    );
    t.deepEqual(
        new o.Column(
            {
                tableAlias : o.ALIASED,
                name : "name`",
                assertDelegate : sd.naturalNumber()
            },
            undefined,
            true
        ).queryStringTree(),
        "`"+o.ALIASED+"--name```"
    );

    t.end();
});
tape(__filename + "-subtable-name-is-in-select-clause", (t) => {
    t.deepEqual(
        new o.Column(
            {
                tableAlias : "tableAlias",
                name : "name",
                assertDelegate : sd.naturalNumber()
            },
            "subTable",
            true
        ).queryStringTree(),
        "`tableAlias`.`subTable--name`"
    );
    t.deepEqual(
        new o.Column(
            {
                tableAlias : "tableAlias`",
                name : "name`",
                assertDelegate : sd.naturalNumber()
            },
            "subTable`",
            true
        ).queryStringTree(),
        "`tableAlias```.`subTable``--name```"
    );
    /*
        TODO Is this correct?
        Do we ever encounter this case?
    */
    t.deepEqual(
        new o.Column(
            {
                tableAlias : o.ALIASED,
                name : "name`",
                assertDelegate : sd.naturalNumber()
            },
            "subTable`",
            true
        ).queryStringTree(),
        "`"+o.ALIASED+"--name```"
    );

    t.end();
});