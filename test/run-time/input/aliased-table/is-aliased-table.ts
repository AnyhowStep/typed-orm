import * as sd from "type-mapping";
import * as tape from "tape";
import * as o from "../../../../dist/src/main";

tape(__filename + "-aliased-table", (t) => {
    t.true(o.AliasedTableUtil.isAliasedTable(new o.AliasedTable(
        {
            usedRef : {},
            alias : "name",
            name : "name",
            columns : o.ColumnMapUtil.fromAssertMap("name", {
                x : sd.unsignedInteger(),
                y : sd.unsignedInteger(),
            }),
        },
        {
            unaliasedQuery : "`name`",
        }
    )));
    t.true(o.AliasedTableUtil.isAliasedTable({
        usedRef : {},
        alias : "name",
        name : "name",
        columns : o.ColumnMapUtil.fromAssertMap("name", {
            x : sd.unsignedInteger(),
            y : sd.unsignedInteger(),
        }),
        unaliasedQuery : "`name`",
    }));
    t.false(o.AliasedTableUtil.isAliasedTable({
        alias : () => "name",
        name : "name",
        columns : o.ColumnMapUtil.fromAssertMap("name", {
            x : sd.unsignedInteger(),
            y : sd.unsignedInteger(),
        }),
    }));
    t.false(o.AliasedTableUtil.isAliasedTable({
        name : "name",
        columns : o.ColumnMapUtil.fromAssertMap("name", {
            x : sd.unsignedInteger(),
            y : sd.unsignedInteger(),
        }),
    }));
    t.false(o.AliasedTableUtil.isAliasedTable({
        alias : "name",
        columns : o.ColumnMapUtil.fromAssertMap("name", {
            x : sd.unsignedInteger(),
            y : sd.unsignedInteger(),
        }),
    }));
    t.false(o.AliasedTableUtil.isAliasedTable({
        alias : "name",
        name : "name",
    }));
    t.true(o.AliasedTableUtil.isAliasedTable({
        usedRef : {},
        alias : "name",
        name : "name",
        columns : {},
        unaliasedQuery : "`name`",
    }));
    t.true(o.AliasedTableUtil.isAliasedTable({
        usedRef : {
            someTable : {
                someColumn : o.column("someTable", "someColumn", sd.boolean())
            }
        },
        alias : "name",
        name : "name",
        columns : {},
        unaliasedQuery : "`name`",
    }));

    t.false(o.AliasedTableUtil.isAliasedTable(new o.AliasedTable(
        {
            usedRef : ("test" as any),
            alias : "name",
            name : "name",
            columns : o.ColumnMapUtil.fromAssertMap("name", {
                x : sd.unsignedInteger(),
                y : sd.unsignedInteger(),
            }),
        },
        {
            unaliasedQuery : "`name`",
        }
    )));
    t.false(o.AliasedTableUtil.isAliasedTable({
        alias : "name",
        name : "name",
        columns : o.ColumnMapUtil.fromAssertMap("name", {
            x : sd.unsignedInteger(),
            y : sd.unsignedInteger(),
        }),
    }));
    t.false(o.AliasedTableUtil.isAliasedTable({
        alias : "name",
        name : "name",
        columns : {},
    }));
    t.false(o.AliasedTableUtil.isAliasedTable({
        usedRef : {
            someColumn : o.column("someTable", "someColumn", sd.boolean())
        },
        alias : "name",
        name : "name",
        columns : {},
    }));
    t.false(o.AliasedTableUtil.isAliasedTable({
        usedRef : {
            someTable : o.column("someTable", "someColumn", sd.boolean())
        },
        alias : "name",
        name : "name",
        columns : {},
    }));


    t.false(o.AliasedTableUtil.isAliasedTable(new o.AliasedTable(
        {
            usedRef : {},
            alias : "name",
            name : "name",
            columns : o.ColumnMapUtil.fromAssertMap("name", {
                x : sd.unsignedInteger(),
                y : sd.unsignedInteger(),
            }),
        },
        {
            unaliasedQuery : (54 as any),
        }
    )));
    t.false(o.AliasedTableUtil.isAliasedTable({
        usedRef : {},
        alias : "name",
        name : "name",
        columns : o.ColumnMapUtil.fromAssertMap("name", {
            x : sd.unsignedInteger(),
            y : sd.unsignedInteger(),
        }),
    }));
    t.false(o.AliasedTableUtil.isAliasedTable({
        usedRef : {},
        alias : "name",
        name : "name",
        columns : {},
    }));
    t.false(o.AliasedTableUtil.isAliasedTable({
        usedRef : {
            someTable : {
                someColumn : o.column("someTable", "someColumn", sd.boolean())
            }
        },
        alias : "name",
        name : "name",
        columns : {},
    }));

    t.end();
});