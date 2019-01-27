import * as sd from "schema-decorator";
import * as tape from "tape";
import * as o from "../../../../dist/src/main";

tape(__filename + "-name", (t) => {
    t.deepEqual(
        new o.AliasedTable(
            {
                usedColumns : [],
                alias : "name",
                name : "irrelevant",
                columns : o.ColumnMapUtil.fromAssertMap("name", {
                    x : sd.naturalNumber(),
                    y : sd.naturalNumber(),
                }),
            },
            {
                unaliasedQuery : "`name`"
            }
        ).queryTree(),
        "`name`"
    );
    t.deepEqual(
        new o.AliasedTable(
            {
                usedColumns : [],
                alias : "name`",
                name : "irrelevant",
                columns : o.ColumnMapUtil.fromAssertMap("name`", {
                    x : sd.naturalNumber(),
                    y : sd.naturalNumber(),
                }),
            },
            {
                unaliasedQuery : "`name```"
            }
        ).queryTree(),
        "`name```"
    );
    t.deepEqual(
        new o.AliasedTable(
            {
                usedColumns : [],
                alias : "name`'",
                name : "irrelevant",
                columns : o.ColumnMapUtil.fromAssertMap("name`'", {
                    x : sd.naturalNumber(),
                    y : sd.naturalNumber(),
                }),
            },
            {
                unaliasedQuery : "`name``'`"
            }
        ).queryTree(),
        "`name``'`"
    );
    t.deepEqual(
        new o.AliasedTable(
            {
                usedColumns : [],
                alias : "name`'\"",
                name : "irrelevant",
                columns : o.ColumnMapUtil.fromAssertMap("name`'\"", {
                    x : sd.naturalNumber(),
                    y : sd.naturalNumber(),
                }),
            },
            {
                unaliasedQuery : "`name``'\"`"
            }
        ).queryTree(),
        "`name``'\"`"
    );
    t.end();
});
tape(__filename + "-name-with-database", (t) => {
    t.deepEqual(
        new o.AliasedTable(
            {
                usedColumns : [],
                alias : "name",
                name : "irrelevant",
                columns : o.ColumnMapUtil.fromAssertMap("name", {
                    x : sd.naturalNumber(),
                    y : sd.naturalNumber(),
                }),
            },
            {
                unaliasedQuery : "`database`.`name`"
            }
        ).queryTree(),
        [
            "`database`.`name`",
            "AS",
            "`name`"
        ]
    );
    t.deepEqual(
        new o.AliasedTable(
            {
                usedColumns : [],
                alias : "name`",
                name : "irrelevant",
                columns : o.ColumnMapUtil.fromAssertMap("name`", {
                    x : sd.naturalNumber(),
                    y : sd.naturalNumber(),
                }),
            },
            {
                unaliasedQuery : "`database```.`name```"
            }
        ).queryTree(),
        [
            "`database```.`name```",
            "AS",
            "`name```"
        ]
    );
    t.deepEqual(
        new o.AliasedTable(
            {
                usedColumns : [],
                alias : "name`'",
                name : "irrelevant",
                columns : o.ColumnMapUtil.fromAssertMap("name`'", {
                    x : sd.naturalNumber(),
                    y : sd.naturalNumber(),
                }),
            },
            {
                unaliasedQuery : "`database``'`.`name``'`"
            }
        ).queryTree(),
        [
            "`database``'`.`name``'`",
            "AS",
            "`name``'`"
        ]
    );
    t.deepEqual(
        new o.AliasedTable(
            {
                usedColumns : [],
                alias : "name`'\"",
                name : "irrelevant",
                columns : o.ColumnMapUtil.fromAssertMap("name`'\"", {
                    x : sd.naturalNumber(),
                    y : sd.naturalNumber(),
                }),
            },
            {
                unaliasedQuery : "`database``'\"`.`name``'\"`",
            }
        ).queryTree(),
        [
            "`database``'\"`.`name``'\"`",
            "AS",
            "`name``'\"`"
        ]
    );
    t.end();
});
tape(__filename + "-with-alias", (t) => {
    t.deepEqual(
        new o.AliasedTable(
            {
                usedColumns : [],
                alias : "alias",
                name : "irrelevant",
                columns : o.ColumnMapUtil.fromAssertMap("alias", {
                    x : sd.naturalNumber(),
                    y : sd.naturalNumber(),
                }),
            },
            {
                unaliasedQuery : "`name`"
            }
        ).queryTree(),
        [
            "`name`",
            "AS",
            "`alias`",
        ]
    );
    t.deepEqual(
        new o.AliasedTable(
            {
                usedColumns : [],
                alias : "alias`",
                name : "irrelevant",
                columns : o.ColumnMapUtil.fromAssertMap("alias", {
                    x : sd.naturalNumber(),
                    y : sd.naturalNumber(),
                }),
            },
            {
                unaliasedQuery : "`name`"
            }
        ).queryTree(),
        [
            "`name`",
            "AS",
            "`alias```"
        ]
    );
    t.deepEqual(
        new o.AliasedTable(
            {
                usedColumns : [],
                alias : "alias`'",
                name : "irrelevant",
                columns : o.ColumnMapUtil.fromAssertMap("alias", {
                    x : sd.naturalNumber(),
                    y : sd.naturalNumber(),
                }),
            },
            {
                unaliasedQuery : "`name`"
            }
        ).queryTree(),
        [
            "`name`",
            "AS",
            "`alias``'`",
        ]
    );
    t.deepEqual(
        new o.AliasedTable(
            {
                usedColumns : [],
                alias : "alias`'\"",
                name : "irrelevant",
                columns : o.ColumnMapUtil.fromAssertMap("alias", {
                    x : sd.naturalNumber(),
                    y : sd.naturalNumber(),
                }),
            },
            {
                unaliasedQuery : "`name`"
            }
        ).queryTree(),
        [
            "`name`",
            "AS",
            "`alias``'\"`"
        ]
    );
    t.end();
});
tape(__filename + "-with-alias-with-database", (t) => {
    t.deepEqual(
        new o.AliasedTable(
            {
                usedColumns : [],
                alias : "alias",
                name : "irrelevant",
                columns : o.ColumnMapUtil.fromAssertMap("alias", {
                    x : sd.naturalNumber(),
                    y : sd.naturalNumber(),
                }),
            },
            {
                unaliasedQuery : "`database`.`name`"
            }
        ).queryTree(),
        [
            "`database`.`name`",
            "AS",
            "`alias`"
        ]
    );
    t.deepEqual(
        new o.AliasedTable(
            {
                usedColumns : [],
                alias : "alias`",
                name : "irrelevant",
                columns : o.ColumnMapUtil.fromAssertMap("alias`", {
                    x : sd.naturalNumber(),
                    y : sd.naturalNumber(),
                }),
            },
            {
                unaliasedQuery : "`database```.`name```"
            }
        ).queryTree(),
        [
            "`database```.`name```",
            "AS",
            "`alias```"
        ]
    );
    t.deepEqual(
        new o.AliasedTable(
            {
                usedColumns : [],
                alias : "alias`'",
                name : "irrelevant",
                columns : o.ColumnMapUtil.fromAssertMap("alias`'", {
                    x : sd.naturalNumber(),
                    y : sd.naturalNumber(),
                }),
            },
            {
                unaliasedQuery : "`database``'`.`name``'`"
            }
        ).queryTree(),
        [
            "`database``'`.`name``'`",
            "AS",
            "`alias``'`"
        ]
    );
    t.deepEqual(
        new o.AliasedTable(
            {
                usedColumns : [],
                alias : "alias`'\"",
                name : "irrelevant",
                columns : o.ColumnMapUtil.fromAssertMap("alias`'\"", {
                    x : sd.naturalNumber(),
                    y : sd.naturalNumber(),
                }),
            },
            {
                unaliasedQuery : "`database``'\"`.`name``'\"`"
            }
        ).queryTree(),
        [
            "`database``'\"`.`name``'\"`",
            "AS",
            "`alias``'\"`"
        ]
    );
    t.end();
});