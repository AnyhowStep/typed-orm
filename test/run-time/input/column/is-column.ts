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

    t.true(o.Column.isColumn(c));
    t.true(o.Column.isColumn({
        tableAlias : "tableAlias",
        name : "name",
        assertDelegate : sd.naturalNumber(),
        __subTableName : undefined,
        __isInSelectClause : true,
    }));

    t.false(o.Column.isColumn({
        tableAlias : "tableAlias",
        name : "name",
        assertDelegate : sd.naturalNumber(),
        __subTableName : undefined,
        __isInSelectClause : undefined,
    }));
    t.false(o.Column.isColumn({
        tableAlias : "tableAlias",
        name : "name",
        __subTableName : undefined,
        __isInSelectClause : true,
    }));
    t.false(o.Column.isColumn({
        tableAlias : "tableAlias",
        assertDelegate : sd.naturalNumber(),
        __subTableName : undefined,
        __isInSelectClause : true,
    }));
    t.false(o.Column.isColumn({
        name : "name",
        assertDelegate : sd.naturalNumber(),
        __subTableName : undefined,
        __isInSelectClause : true,
    }));
    t.false(o.Column.isColumn({
        tableAlias : "tableAlias",
        name : "name",
        assertDelegate : sd.naturalNumber(),
        __subTableName : undefined,
    }));

    t.end();
});

//TODO Make sure other types are not accidentally detected as columns
//Highly unlikely, though.
//They would have to have the __isSelectReference field