import * as sd from "schema-decorator";
import * as tape from "tape";
import * as o from "../../../../../../dist/src/main";

tape(__filename, (t) => {
    const table = o.table(
        "table",
        {
            x : sd.number(),
            y : sd.number(),
            z : sd.number(),
            a : sd.number(),
            b : sd.number(),
            c : sd.number(),
        }
    );

    const mul1 = o.mul(
        table.columns.x,
        table.columns.y
    );
    t.deepEqual(
        new o.SqlFormatter().format(
            o.QueryTreeUtil.toSql(mul1.queryTree)
        ),
        "(`table`.`x` * `table`.`y`)"
    );

    const mul2 = o.mul(
        table.columns.x,
        table.columns.y,
        table.columns.z,
    );
    t.deepEqual(
        new o.SqlFormatter().format(
            o.QueryTreeUtil.toSql(mul2.queryTree)
        ),
        "(`table`.`x` * `table`.`y` * `table`.`z`)"
    );

    const mul3 = o.mul(
        mul1,
        table.columns.a
    );
    t.deepEqual(
        new o.SqlFormatter().format(
            o.QueryTreeUtil.toSql(mul3.queryTree)
        ),
        "(`table`.`x` * `table`.`y` * `table`.`a`)"
    );

    const mul4 = o.mul(
        mul3,
        table.columns.b
    );
    t.deepEqual(
        new o.SqlFormatter().format(
            o.QueryTreeUtil.toSql(mul4.queryTree)
        ),
        "(\n  `table`.`x` * `table`.`y` * `table`.`a` * `table`.`b`\n)"
    );

    const mul5 = o.mul(
        o.sub(table.columns.x, table.columns.y),
        table.columns.z
    );
    t.deepEqual(
        new o.SqlFormatter().format(
            o.QueryTreeUtil.toSql(mul5.queryTree)
        ),
        "((`table`.`x` - `table`.`y`) * `table`.`z`)"
    );

    const mul6 = o.mul(
        table.columns.x
    );
    t.deepEqual(
        new o.SqlFormatter().format(
            o.QueryTreeUtil.toSql(mul6.queryTree)
        ),
        "`table`.`x`"
    );

    const mul7 = o.mul(
    );
    t.deepEqual(
        new o.SqlFormatter().format(
            o.QueryTreeUtil.toSql(mul7.queryTree)
        ),
        "1"
    );

    const mul8 = o.mul(
        mul7,
        table.columns.x
    );
    t.deepEqual(
        new o.SqlFormatter().format(
            o.QueryTreeUtil.toSql(mul8.queryTree)
        ),
        "(1 * `table`.`x`)"
    );

    const mul9 = o.mul(
        0,
        table.columns.x
    );
    t.deepEqual(
        new o.SqlFormatter().format(
            o.QueryTreeUtil.toSql(mul9.queryTree)
        ),
        "(0 * `table`.`x`)"
    );

    t.end();
});