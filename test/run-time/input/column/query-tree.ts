import * as sd from "type-mapping";
import * as tape from "tape";
import * as o from "../../../../dist/src/main";

tape(__filename, (t) => {
    t.deepEqual(
        new o.Column(
            {
                tableAlias : "tableAlias",
                name : "name",
                assertDelegate : sd.unsignedInteger()
            },
            undefined
        ).queryTree(),
        "`tableAlias`.`name`"
    );
    t.deepEqual(
        new o.Column(
            {
                tableAlias : "tableAlias`",
                name : "name`",
                assertDelegate : sd.unsignedInteger()
            },
            undefined
        ).queryTree(),
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
                assertDelegate : sd.unsignedInteger()
            },
            undefined
        ).queryTree(),
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
                assertDelegate : sd.unsignedInteger()
            },
            true
        ).queryTree(),
        "`tableAlias--name`"
    );
    t.deepEqual(
        new o.Column(
            {
                tableAlias : "tableAlias`",
                name : "name`",
                assertDelegate : sd.unsignedInteger()
            },
            true
        ).queryTree(),
        "`tableAlias``--name```"
    );
    t.deepEqual(
        new o.Column(
            {
                tableAlias : o.ALIASED,
                name : "name`",
                assertDelegate : sd.unsignedInteger()
            },
            true
        ).queryTree(),
        "`"+o.ALIASED+"--name```"
    );

    t.end();
});