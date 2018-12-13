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

    const and1 = o.and(
        table.columns.x,
        table.columns.y
    );
    t.deepEqual(
        new o.SqlFormatter().format(
            o.QueryTreeUtil.toSql(and1.queryTree)
        ),
        "(\n  `table`.`x` AND\n  `table`.`y`\n)"
    );

    const and2 = o.and(
        table.columns.x,
        table.columns.y,
        table.columns.z,
    );
    t.deepEqual(
        new o.SqlFormatter().format(
            o.QueryTreeUtil.toSql(and2.queryTree)
        ),
        "(\n  `table`.`x` AND\n  `table`.`y` AND\n  `table`.`z`\n)"
    );

    const and3 = o.and(
        and1,
        table.columns.a
    );
    t.deepEqual(
        new o.SqlFormatter().format(
            o.QueryTreeUtil.toSql(and3.queryTree)
        ),
        "(\n  `table`.`x` AND\n  `table`.`y` AND\n  `table`.`a`\n)"
    );

    const and4 = o.and(
        and3,
        table.columns.b
    );
    t.deepEqual(
        new o.SqlFormatter().format(
            o.QueryTreeUtil.toSql(and4.queryTree)
        ),
        "(\n  `table`.`x` AND\n  `table`.`y` AND\n  `table`.`a` AND\n  `table`.`b`\n)"
    );

    const and5 = o.and(
        o.eq(table.columns.x, table.columns.y),
        table.columns.z
    );
    t.deepEqual(
        new o.SqlFormatter().format(
            o.QueryTreeUtil.toSql(and5.queryTree)
        ),
        "(\n  (`table`.`x` = `table`.`y`) AND\n  `table`.`z`\n)"
    );

    const and6 = o.and(
        table.columns.x
    );
    t.deepEqual(
        new o.SqlFormatter().format(
            o.QueryTreeUtil.toSql(and6.queryTree)
        ),
        "`table`.`x`"
    );

    const and7 = o.and(
    );
    t.deepEqual(
        new o.SqlFormatter().format(
            o.QueryTreeUtil.toSql(and7.queryTree)
        ),
        "true"
    );

    const and8 = o.and(
        and7,
        table.columns.x
    );
    t.deepEqual(
        new o.SqlFormatter().format(
            o.QueryTreeUtil.toSql(and8.queryTree)
        ),
        "`table`.`x`"
    );

    t.end();
});