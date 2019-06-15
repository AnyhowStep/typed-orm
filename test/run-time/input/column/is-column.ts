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

    t.true(o.ColumnUtil.isColumn(c));
    t.true(o.ColumnUtil.isColumn({
        tableAlias : "tableAlias",
        name : "name",
        assertDelegate : sd.unsignedInteger(),
        __isFromExprSelectItem : true,
    }));

    t.false(o.ColumnUtil.isColumn({
        tableAlias : "tableAlias",
        name : "name",
        assertDelegate : sd.unsignedInteger(),
        __isFromExprSelectItem : undefined,
    }));
    t.false(o.ColumnUtil.isColumn({
        tableAlias : "tableAlias",
        name : "name",
        __isFromExprSelectItem : true,
    }));
    t.false(o.ColumnUtil.isColumn({
        tableAlias : "tableAlias",
        assertDelegate : sd.unsignedInteger(),
        __isFromExprSelectItem : true,
    }));
    t.false(o.ColumnUtil.isColumn({
        name : "name",
        assertDelegate : sd.unsignedInteger(),
        __isFromExprSelectItem : true,
    }));
    t.false(o.ColumnUtil.isColumn({
        tableAlias : "tableAlias",
        name : "name",
        assertDelegate : sd.unsignedInteger(),
    }));

    t.end();
});

//TODO Make sure other types are not accidentally detected as columns
//Highly unlikely, though.
//They would have to have the __isSelectReference field