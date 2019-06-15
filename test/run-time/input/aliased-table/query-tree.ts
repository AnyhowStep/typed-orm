import * as sd from "type-mapping";
import * as tape from "tape";
import * as o from "../../../../dist/src/main";

tape(__filename + "-name", (t) => {
    t.deepEqual(
        new o.AliasedTable(
            {
                usedRef : {},
                alias : "name",
                name : "irrelevant",
                columns : o.ColumnMapUtil.fromAssertMap("name", {
                    x : sd.unsignedInteger(),
                    y : sd.unsignedInteger(),
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
                usedRef : {},
                alias : "name`",
                name : "irrelevant",
                columns : o.ColumnMapUtil.fromAssertMap("name`", {
                    x : sd.unsignedInteger(),
                    y : sd.unsignedInteger(),
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
                usedRef : {},
                alias : "name`'",
                name : "irrelevant",
                columns : o.ColumnMapUtil.fromAssertMap("name`'", {
                    x : sd.unsignedInteger(),
                    y : sd.unsignedInteger(),
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
                usedRef : {},
                alias : "name`'\"",
                name : "irrelevant",
                columns : o.ColumnMapUtil.fromAssertMap("name`'\"", {
                    x : sd.unsignedInteger(),
                    y : sd.unsignedInteger(),
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
                usedRef : {},
                alias : "name",
                name : "irrelevant",
                columns : o.ColumnMapUtil.fromAssertMap("name", {
                    x : sd.unsignedInteger(),
                    y : sd.unsignedInteger(),
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
                usedRef : {},
                alias : "name`",
                name : "irrelevant",
                columns : o.ColumnMapUtil.fromAssertMap("name`", {
                    x : sd.unsignedInteger(),
                    y : sd.unsignedInteger(),
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
                usedRef : {},
                alias : "name`'",
                name : "irrelevant",
                columns : o.ColumnMapUtil.fromAssertMap("name`'", {
                    x : sd.unsignedInteger(),
                    y : sd.unsignedInteger(),
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
                usedRef : {},
                alias : "name`'\"",
                name : "irrelevant",
                columns : o.ColumnMapUtil.fromAssertMap("name`'\"", {
                    x : sd.unsignedInteger(),
                    y : sd.unsignedInteger(),
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
                usedRef : {},
                alias : "alias",
                name : "irrelevant",
                columns : o.ColumnMapUtil.fromAssertMap("alias", {
                    x : sd.unsignedInteger(),
                    y : sd.unsignedInteger(),
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
                usedRef : {},
                alias : "alias`",
                name : "irrelevant",
                columns : o.ColumnMapUtil.fromAssertMap("alias", {
                    x : sd.unsignedInteger(),
                    y : sd.unsignedInteger(),
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
                usedRef : {},
                alias : "alias`'",
                name : "irrelevant",
                columns : o.ColumnMapUtil.fromAssertMap("alias", {
                    x : sd.unsignedInteger(),
                    y : sd.unsignedInteger(),
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
                usedRef : {},
                alias : "alias`'\"",
                name : "irrelevant",
                columns : o.ColumnMapUtil.fromAssertMap("alias", {
                    x : sd.unsignedInteger(),
                    y : sd.unsignedInteger(),
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
                usedRef : {},
                alias : "alias",
                name : "irrelevant",
                columns : o.ColumnMapUtil.fromAssertMap("alias", {
                    x : sd.unsignedInteger(),
                    y : sd.unsignedInteger(),
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
                usedRef : {},
                alias : "alias`",
                name : "irrelevant",
                columns : o.ColumnMapUtil.fromAssertMap("alias`", {
                    x : sd.unsignedInteger(),
                    y : sd.unsignedInteger(),
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
                usedRef : {},
                alias : "alias`'",
                name : "irrelevant",
                columns : o.ColumnMapUtil.fromAssertMap("alias`'", {
                    x : sd.unsignedInteger(),
                    y : sd.unsignedInteger(),
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
                usedRef : {},
                alias : "alias`'\"",
                name : "irrelevant",
                columns : o.ColumnMapUtil.fromAssertMap("alias`'\"", {
                    x : sd.unsignedInteger(),
                    y : sd.unsignedInteger(),
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