import * as sd from "schema-decorator";
import * as tape from "tape";
import * as o from "../../../../dist/src/main";

tape(__filename + "-aliased-table", (t) => {
    t.true(o.AliasedTable.isAliasedTable(new o.AliasedTable(
        {
            usedRef : {},
            alias : "name",
            name : "name",
            columns : o.ColumnMapUtil.fromAssertMap("name", {
                x : sd.naturalNumber(),
                y : sd.naturalNumber(),
            }),
        },
        undefined
    )));
    t.true(o.AliasedTable.isAliasedTable({
        usedRef : {},
        alias : "name",
        name : "name",
        columns : o.ColumnMapUtil.fromAssertMap("name", {
            x : sd.naturalNumber(),
            y : sd.naturalNumber(),
        }),
    }));
    t.false(o.AliasedTable.isAliasedTable({
        alias : () => "name",
        name : "name",
        columns : o.ColumnMapUtil.fromAssertMap("name", {
            x : sd.naturalNumber(),
            y : sd.naturalNumber(),
        }),
    }));
    t.false(o.AliasedTable.isAliasedTable({
        name : "name",
        columns : o.ColumnMapUtil.fromAssertMap("name", {
            x : sd.naturalNumber(),
            y : sd.naturalNumber(),
        }),
    }));
    t.false(o.AliasedTable.isAliasedTable({
        alias : "name",
        columns : o.ColumnMapUtil.fromAssertMap("name", {
            x : sd.naturalNumber(),
            y : sd.naturalNumber(),
        }),
    }));
    t.false(o.AliasedTable.isAliasedTable({
        alias : "name",
        name : "name",
    }));
    t.true(o.AliasedTable.isAliasedTable({
        usedRef : {},
        alias : "name",
        name : "name",
        columns : {},
    }));
    t.true(o.AliasedTable.isAliasedTable({
        usedRef : {
            someTable : {
                someColumn : o.column("someTable", "someColumn", sd.boolean())
            }
        },
        alias : "name",
        name : "name",
        columns : {},
    }));

    t.false(o.AliasedTable.isAliasedTable(new o.AliasedTable(
        {
            usedRef : ("test" as any),
            alias : "name",
            name : "name",
            columns : o.ColumnMapUtil.fromAssertMap("name", {
                x : sd.naturalNumber(),
                y : sd.naturalNumber(),
            }),
        },
        undefined
    )));
    t.false(o.AliasedTable.isAliasedTable({
        alias : "name",
        name : "name",
        columns : o.ColumnMapUtil.fromAssertMap("name", {
            x : sd.naturalNumber(),
            y : sd.naturalNumber(),
        }),
    }));
    t.false(o.AliasedTable.isAliasedTable({
        alias : "name",
        name : "name",
        columns : {},
    }));
    t.false(o.AliasedTable.isAliasedTable({
        usedRef : {
            someColumn : o.column("someTable", "someColumn", sd.boolean())
        },
        alias : "name",
        name : "name",
        columns : {},
    }));
    t.false(o.AliasedTable.isAliasedTable({
        usedRef : {
            someTable : o.column("someTable", "someColumn", sd.boolean())
        },
        alias : "name",
        name : "name",
        columns : {},
    }));

    t.end();
});