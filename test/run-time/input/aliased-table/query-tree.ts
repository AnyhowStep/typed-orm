import * as sd from "schema-decorator";
import * as tape from "tape";
import * as o from "../../../../dist/src/main";

tape(__filename + "-name", (t) => {
    t.deepEqual(
        new o.AliasedTable(
            {
                alias : "name",
                name : "name",
                columns : o.ColumnMapUtil.fromAssertMap("name", {
                    x : sd.naturalNumber(),
                    y : sd.naturalNumber(),
                }),
            },
            undefined
        ).queryTree(),
        "`name`"
    );
    t.deepEqual(
        new o.AliasedTable(
            {
                alias : "name`",
                name : "name`",
                columns : o.ColumnMapUtil.fromAssertMap("name`", {
                    x : sd.naturalNumber(),
                    y : sd.naturalNumber(),
                }),
            },
            undefined
        ).queryTree(),
        "`name```"
    );
    t.deepEqual(
        new o.AliasedTable(
            {
                alias : "name`'",
                name : "name`'",
                columns : o.ColumnMapUtil.fromAssertMap("name`'", {
                    x : sd.naturalNumber(),
                    y : sd.naturalNumber(),
                }),
            },
            undefined
        ).queryTree(),
        "`name``'`"
    );
    t.deepEqual(
        new o.AliasedTable(
            {
                alias : "name`'\"",
                name : "name`'\"",
                columns : o.ColumnMapUtil.fromAssertMap("name`'\"", {
                    x : sd.naturalNumber(),
                    y : sd.naturalNumber(),
                }),
            },
            undefined
        ).queryTree(),
        "`name``'\"`"
    );
    t.end();
});
tape(__filename + "-name-with-database", (t) => {
    t.deepEqual(
        new o.AliasedTable(
            {
                alias : "name",
                name : "name",
                columns : o.ColumnMapUtil.fromAssertMap("name", {
                    x : sd.naturalNumber(),
                    y : sd.naturalNumber(),
                }),
            },
            "database"
        ).queryTree(),
        "`database`.`name`"
    );
    t.deepEqual(
        new o.AliasedTable(
            {
                alias : "name`",
                name : "name`",
                columns : o.ColumnMapUtil.fromAssertMap("name`", {
                    x : sd.naturalNumber(),
                    y : sd.naturalNumber(),
                }),
            },
            "database`"
        ).queryTree(),
        "`database```.`name```"
    );
    t.deepEqual(
        new o.AliasedTable(
            {
                alias : "name`'",
                name : "name`'",
                columns : o.ColumnMapUtil.fromAssertMap("name`'", {
                    x : sd.naturalNumber(),
                    y : sd.naturalNumber(),
                }),
            },
            "database`'"
        ).queryTree(),
        "`database``'`.`name``'`"
    );
    t.deepEqual(
        new o.AliasedTable(
            {
                alias : "name`'\"",
                name : "name`'\"",
                columns : o.ColumnMapUtil.fromAssertMap("name`'\"", {
                    x : sd.naturalNumber(),
                    y : sd.naturalNumber(),
                }),
            },
            "database`'\""
        ).queryTree(),
        "`database``'\"`.`name``'\"`"
    );
    t.end();
});
tape(__filename + "-with-alias", (t) => {
    t.deepEqual(
        new o.AliasedTable(
            {
                alias : "alias",
                name : "name",
                columns : o.ColumnMapUtil.fromAssertMap("alias", {
                    x : sd.naturalNumber(),
                    y : sd.naturalNumber(),
                }),
            },
            undefined
        ).queryTree(),
        "`name` AS `alias`"
    );
    t.deepEqual(
        new o.AliasedTable(
            {
                alias : "alias`",
                name : "name",
                columns : o.ColumnMapUtil.fromAssertMap("alias", {
                    x : sd.naturalNumber(),
                    y : sd.naturalNumber(),
                }),
            },
            undefined
        ).queryTree(),
        "`name` AS `alias```"
    );
    t.deepEqual(
        new o.AliasedTable(
            {
                alias : "alias`'",
                name : "name",
                columns : o.ColumnMapUtil.fromAssertMap("alias", {
                    x : sd.naturalNumber(),
                    y : sd.naturalNumber(),
                }),
            },
            undefined
        ).queryTree(),
        "`name` AS `alias``'`"
    );
    t.deepEqual(
        new o.AliasedTable(
            {
                alias : "alias`'\"",
                name : "name",
                columns : o.ColumnMapUtil.fromAssertMap("alias", {
                    x : sd.naturalNumber(),
                    y : sd.naturalNumber(),
                }),
            },
            undefined
        ).queryTree(),
        "`name` AS `alias``'\"`"
    );
    t.end();
});
tape(__filename + "-with-alias-with-database", (t) => {
    t.deepEqual(
        new o.AliasedTable(
            {
                alias : "alias",
                name : "name",
                columns : o.ColumnMapUtil.fromAssertMap("alias", {
                    x : sd.naturalNumber(),
                    y : sd.naturalNumber(),
                }),
            },
            "database"
        ).queryTree(),
        "`database`.`name` AS `alias`"
    );
    t.deepEqual(
        new o.AliasedTable(
            {
                alias : "alias`",
                name : "name`",
                columns : o.ColumnMapUtil.fromAssertMap("alias`", {
                    x : sd.naturalNumber(),
                    y : sd.naturalNumber(),
                }),
            },
            "database`"
        ).queryTree(),
        "`database```.`name``` AS `alias```"
    );
    t.deepEqual(
        new o.AliasedTable(
            {
                alias : "alias`'",
                name : "name`'",
                columns : o.ColumnMapUtil.fromAssertMap("alias`'", {
                    x : sd.naturalNumber(),
                    y : sd.naturalNumber(),
                }),
            },
            "database`'"
        ).queryTree(),
        "`database``'`.`name``'` AS `alias``'`"
    );
    t.deepEqual(
        new o.AliasedTable(
            {
                alias : "alias`'\"",
                name : "name`'\"",
                columns : o.ColumnMapUtil.fromAssertMap("alias`'\"", {
                    x : sd.naturalNumber(),
                    y : sd.naturalNumber(),
                }),
            },
            "database`'\""
        ).queryTree(),
        "`database``'\"`.`name``'\"` AS `alias``'\"`"
    );
    t.end();
});