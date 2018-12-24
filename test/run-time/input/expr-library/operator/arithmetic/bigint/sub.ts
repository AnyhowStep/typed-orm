import * as tape from "tape";
import * as o from "../../../../../../../dist/src/main";

tape(__filename, (t) => {
    const table = o.table(
        "table",
        {
            x : o.bigint(),
            y : o.bigint(),
            z : o.bigint(),
            a : o.bigint(),
            b : o.bigint(),
            c : o.bigint(),
        }
    );

    const bigIntSub1 = o.bigIntSub(
        table.columns.x,
        table.columns.y
    );
    t.deepEqual(
        new o.SqlFormatter().format(
            o.QueryTreeUtil.toSql(bigIntSub1.queryTree)
        ),
        "(`table`.`x` - `table`.`y`)"
    );

    const bigIntSub2 = o.bigIntSub(
        table.columns.x,
        table.columns.y,
        table.columns.z,
    );
    t.deepEqual(
        new o.SqlFormatter().format(
            o.QueryTreeUtil.toSql(bigIntSub2.queryTree)
        ),
        "(`table`.`x` - `table`.`y` - `table`.`z`)"
    );

    const bigIntSub3 = o.bigIntSub(
        bigIntSub1,
        table.columns.a
    );
    t.deepEqual(
        new o.SqlFormatter().format(
            o.QueryTreeUtil.toSql(bigIntSub3.queryTree)
        ),
        "(`table`.`x` - `table`.`y` - `table`.`a`)"
    );

    const bigIntSub4 = o.bigIntSub(
        bigIntSub3,
        table.columns.b
    );
    t.deepEqual(
        new o.SqlFormatter().format(
            o.QueryTreeUtil.toSql(bigIntSub4.queryTree)
        ),
        "(\n  `table`.`x` - `table`.`y` - `table`.`a` - `table`.`b`\n)"
    );

    const bigIntSub5 = o.bigIntSub(
        o.bigIntMul(table.columns.x, table.columns.y),
        table.columns.z
    );
    t.deepEqual(
        new o.SqlFormatter().format(
            o.QueryTreeUtil.toSql(bigIntSub5.queryTree)
        ),
        "((`table`.`x` * `table`.`y`) - `table`.`z`)"
    );

    const bigIntSub6 = o.bigIntSub(
        table.columns.x
    );
    t.deepEqual(
        new o.SqlFormatter().format(
            o.QueryTreeUtil.toSql(bigIntSub6.queryTree)
        ),
        "`table`.`x`"
    );

    const bigIntSub7 = o.bigIntSub(
    );
    t.deepEqual(
        new o.SqlFormatter().format(
            o.QueryTreeUtil.toSql(bigIntSub7.queryTree)
        ),
        "0"
    );

    const bigIntSub8 = o.bigIntSub(
        bigIntSub7,
        table.columns.x
    );
    t.deepEqual(
        new o.SqlFormatter().format(
            o.QueryTreeUtil.toSql(bigIntSub8.queryTree)
        ),
        "(0 - `table`.`x`)"
    );

    const bigIntSub9 = o.bigIntSub(
        0n,
        table.columns.x
    );
    t.deepEqual(
        new o.SqlFormatter().format(
            o.QueryTreeUtil.toSql(bigIntSub9.queryTree)
        ),
        "(0 - `table`.`x`)"
    );

    t.end();
});