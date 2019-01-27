import * as sd from "schema-decorator";
import * as tape from "tape";
import * as o from "../../../../dist/src/main";

tape(__filename + "-aliased-table", (t) => {
    t.true(o.AliasedTableUtil.isAliasedTable(new o.AliasedTable(
        {
            usedColumns : [],
            alias : "name",
            name : "name",
            columns : o.ColumnMapUtil.fromAssertMap("name", {
                x : sd.naturalNumber(),
                y : sd.naturalNumber(),
            }),
        },
        {
            unaliasedQuery : "`name`",
        }
    )));
    t.true(o.AliasedTableUtil.isAliasedTable({
        usedColumns : [],
        alias : "name",
        name : "name",
        columns : o.ColumnMapUtil.fromAssertMap("name", {
            x : sd.naturalNumber(),
            y : sd.naturalNumber(),
        }),
        unaliasedQuery : "`name`",
    }));
    t.false(o.AliasedTableUtil.isAliasedTable({
        alias : () => "name",
        name : "name",
        columns : o.ColumnMapUtil.fromAssertMap("name", {
            x : sd.naturalNumber(),
            y : sd.naturalNumber(),
        }),
    }));
    t.false(o.AliasedTableUtil.isAliasedTable({
        name : "name",
        columns : o.ColumnMapUtil.fromAssertMap("name", {
            x : sd.naturalNumber(),
            y : sd.naturalNumber(),
        }),
    }));
    t.false(o.AliasedTableUtil.isAliasedTable({
        alias : "name",
        columns : o.ColumnMapUtil.fromAssertMap("name", {
            x : sd.naturalNumber(),
            y : sd.naturalNumber(),
        }),
    }));
    t.false(o.AliasedTableUtil.isAliasedTable({
        alias : "name",
        name : "name",
    }));
    t.true(o.AliasedTableUtil.isAliasedTable({
        usedColumns : [],
        alias : "name",
        name : "name",
        columns : {},
        unaliasedQuery : "`name`",
    }));
    t.true(o.AliasedTableUtil.isAliasedTable({
        usedColumns : [
            o.column("someTable", "someColumn", sd.boolean())
        ],
        alias : "name",
        name : "name",
        columns : {},
        unaliasedQuery : "`name`",
    }));

    t.false(o.AliasedTableUtil.isAliasedTable(new o.AliasedTable(
        {
            usedColumns : [
                "test" as any
            ],
            alias : "name",
            name : "name",
            columns : o.ColumnMapUtil.fromAssertMap("name", {
                x : sd.naturalNumber(),
                y : sd.naturalNumber(),
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
            x : sd.naturalNumber(),
            y : sd.naturalNumber(),
        }),
    }));
    t.false(o.AliasedTableUtil.isAliasedTable({
        alias : "name",
        name : "name",
        columns : {},
    }));
    t.false(o.AliasedTableUtil.isAliasedTable({
        usedColumns : [
            o.column("someTable", "someColumn", sd.boolean())
        ],
        alias : "name",
        name : "name",
        columns : {},
    }));
    t.false(o.AliasedTableUtil.isAliasedTable({
        usedColumns : [
            o.column("someTable", "someColumn", sd.boolean())
        ],
        alias : "name",
        name : "name",
        columns : {},
    }));


    t.false(o.AliasedTableUtil.isAliasedTable(new o.AliasedTable(
        {
            usedColumns : [],
            alias : "name",
            name : "name",
            columns : o.ColumnMapUtil.fromAssertMap("name", {
                x : sd.naturalNumber(),
                y : sd.naturalNumber(),
            }),
        },
        {
            unaliasedQuery : (54 as any),
        }
    )));
    t.false(o.AliasedTableUtil.isAliasedTable({
        usedColumns : [],
        alias : "name",
        name : "name",
        columns : o.ColumnMapUtil.fromAssertMap("name", {
            x : sd.naturalNumber(),
            y : sd.naturalNumber(),
        }),
    }));
    t.false(o.AliasedTableUtil.isAliasedTable({
        usedColumns : [],
        alias : "name",
        name : "name",
        columns : {},
    }));
    t.false(o.AliasedTableUtil.isAliasedTable({
        usedColumns : [
            o.column("someTable", "someColumn", sd.boolean())
        ],
        alias : "name",
        name : "name",
        columns : {},
    }));

    t.end();
});