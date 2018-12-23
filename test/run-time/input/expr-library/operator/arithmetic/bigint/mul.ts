import * as tape from "tape";
import * as o from "../../../../../../../dist/src/main";

tape(__filename, (t) => {
    const table = o.table(
        "table",
        {
            x : o.bigint,
            y : o.bigint,
            z : o.bigint,
            a : o.bigint,
            b : o.bigint,
            c : o.bigint,
        }
    );

    const bigIntMul1 = o.bigIntMul(
        table.columns.x,
        table.columns.y
    );
    t.deepEqual(
        new o.SqlFormatter().format(
            o.QueryTreeUtil.toSql(bigIntMul1.queryTree)
        ),
        "(`table`.`x` * `table`.`y`)"
    );

    const bigIntMul2 = o.bigIntMul(
        table.columns.x,
        table.columns.y,
        table.columns.z,
    );
    t.deepEqual(
        new o.SqlFormatter().format(
            o.QueryTreeUtil.toSql(bigIntMul2.queryTree)
        ),
        "(`table`.`x` * `table`.`y` * `table`.`z`)"
    );

    const bigIntMul3 = o.bigIntMul(
        bigIntMul1,
        table.columns.a
    );
    t.deepEqual(
        new o.SqlFormatter().format(
            o.QueryTreeUtil.toSql(bigIntMul3.queryTree)
        ),
        "(`table`.`x` * `table`.`y` * `table`.`a`)"
    );

    const bigIntMul4 = o.bigIntMul(
        bigIntMul3,
        table.columns.b
    );
    t.deepEqual(
        new o.SqlFormatter().format(
            o.QueryTreeUtil.toSql(bigIntMul4.queryTree)
        ),
        "(\n  `table`.`x` * `table`.`y` * `table`.`a` * `table`.`b`\n)"
    );

    const bigIntMul5 = o.bigIntMul(
        o.bigIntSub(table.columns.x, table.columns.y),
        table.columns.z
    );
    t.deepEqual(
        new o.SqlFormatter().format(
            o.QueryTreeUtil.toSql(bigIntMul5.queryTree)
        ),
        "((`table`.`x` - `table`.`y`) * `table`.`z`)"
    );

    const bigIntMul6 = o.bigIntMul(
        table.columns.x
    );
    t.deepEqual(
        new o.SqlFormatter().format(
            o.QueryTreeUtil.toSql(bigIntMul6.queryTree)
        ),
        "`table`.`x`"
    );

    const bigIntMul7 = o.bigIntMul(
    );
    t.deepEqual(
        new o.SqlFormatter().format(
            o.QueryTreeUtil.toSql(bigIntMul7.queryTree)
        ),
        "1"
    );

    const bigIntMul8 = o.bigIntMul(
        bigIntMul7,
        table.columns.x
    );
    t.deepEqual(
        new o.SqlFormatter().format(
            o.QueryTreeUtil.toSql(bigIntMul8.queryTree)
        ),
        "(1 * `table`.`x`)"
    );

    const bigIntMul9 = o.bigIntMul(
        0n,
        table.columns.x
    );
    t.deepEqual(
        new o.SqlFormatter().format(
            o.QueryTreeUtil.toSql(bigIntMul9.queryTree)
        ),
        "(0 * `table`.`x`)"
    );

    t.end();
});