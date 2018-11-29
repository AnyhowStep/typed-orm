import * as sd from "schema-decorator";
import * as tape from "tape";
import * as o from "../../../../src/main";

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
        ).queryStringTree(),
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
        ).queryStringTree(),
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
        ).queryStringTree(),
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
        ).queryStringTree(),
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
        ).queryStringTree(),
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
        ).queryStringTree(),
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
        ).queryStringTree(),
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
        ).queryStringTree(),
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
        ).queryStringTree(),
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
        ).queryStringTree(),
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
        ).queryStringTree(),
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
        ).queryStringTree(),
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
        ).queryStringTree(),
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
        ).queryStringTree(),
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
        ).queryStringTree(),
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
        ).queryStringTree(),
        "`database``'\"`.`name``'\"` AS `alias``'\"`"
    );
    t.end();
});