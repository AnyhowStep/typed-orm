import * as sd from "schema-decorator";
import * as tape from "tape";
import * as o from "../../../../../../dist/src/main";

tape(__filename, (t) => {
    const table = o.table(
        "table",
        {
            x : sd.boolean(),
            y : sd.boolean(),
            z : sd.boolean(),
            a : sd.boolean(),
            b : sd.boolean(),
            c : sd.boolean(),
        }
    );

    const or1 = o.or(
        table.columns.x,
        table.columns.y
    );
    t.deepEqual(
        new o.SqlFormatter().format(
            o.QueryTreeUtil.toSql(or1.queryTree)
        ),
        "(\n  `table`.`x` OR\n  `table`.`y`\n)"
    );

    const or2 = o.or(
        table.columns.x,
        table.columns.y,
        table.columns.z,
    );
    t.deepEqual(
        new o.SqlFormatter().format(
            o.QueryTreeUtil.toSql(or2.queryTree)
        ),
        "(\n  `table`.`x` OR\n  `table`.`y` OR\n  `table`.`z`\n)"
    );

    const or3 = o.or(
        or1,
        table.columns.a
    );
    t.deepEqual(
        new o.SqlFormatter().format(
            o.QueryTreeUtil.toSql(or3.queryTree)
        ),
        "(\n  `table`.`x` OR\n  `table`.`y` OR\n  `table`.`a`\n)"
    );

    const or4 = o.or(
        or3,
        table.columns.b
    );
    t.deepEqual(
        new o.SqlFormatter().format(
            o.QueryTreeUtil.toSql(or4.queryTree)
        ),
        "(\n  `table`.`x` OR\n  `table`.`y` OR\n  `table`.`a` OR\n  `table`.`b`\n)"
    );

    const or5 = o.or(
        o.eq(table.columns.x, table.columns.y),
        table.columns.z
    );
    t.deepEqual(
        new o.SqlFormatter().format(
            o.QueryTreeUtil.toSql(or5.queryTree)
        ),
        "(\n  (`table`.`x` = `table`.`y`) OR\n  `table`.`z`\n)"
    );

    const or6 = o.or(
        table.columns.x
    );
    t.deepEqual(
        new o.SqlFormatter().format(
            o.QueryTreeUtil.toSql(or6.queryTree)
        ),
        "`table`.`x`"
    );

    const or7 = o.or(
    );
    t.deepEqual(
        new o.SqlFormatter().format(
            o.QueryTreeUtil.toSql(or7.queryTree)
        ),
        "false"
    );

    const or8 = o.or(
        or7,
        table.columns.x
    );
    t.deepEqual(
        new o.SqlFormatter().format(
            o.QueryTreeUtil.toSql(or8.queryTree)
        ),
        "`table`.`x`"
    );

    const or9 = o.or(
        false,
        table.columns.x
    );
    t.deepEqual(
        new o.SqlFormatter().format(
            o.QueryTreeUtil.toSql(or9.queryTree)
        ),
        "`table`.`x`"
    );

    t.end();
});