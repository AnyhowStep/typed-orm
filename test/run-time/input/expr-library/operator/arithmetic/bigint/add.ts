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

    const bigIntAdd1 = o.bigIntAdd(
        table.columns.x,
        table.columns.y
    );
    t.deepEqual(
        new o.SqlFormatter().format(
            o.QueryTreeUtil.toSql(bigIntAdd1.queryTree)
        ),
        "(`table`.`x` + `table`.`y`)"
    );

    const bigIntAdd2 = o.bigIntAdd(
        table.columns.x,
        table.columns.y,
        table.columns.z,
    );
    t.deepEqual(
        new o.SqlFormatter().format(
            o.QueryTreeUtil.toSql(bigIntAdd2.queryTree)
        ),
        "(`table`.`x` + `table`.`y` + `table`.`z`)"
    );

    const bigIntAdd3 = o.bigIntAdd(
        bigIntAdd1,
        table.columns.a
    );
    t.deepEqual(
        new o.SqlFormatter().format(
            o.QueryTreeUtil.toSql(bigIntAdd3.queryTree)
        ),
        "(`table`.`x` + `table`.`y` + `table`.`a`)"
    );

    const bigIntAdd4 = o.bigIntAdd(
        bigIntAdd3,
        table.columns.b
    );
    t.deepEqual(
        new o.SqlFormatter().format(
            o.QueryTreeUtil.toSql(bigIntAdd4.queryTree)
        ),
        "(\n  `table`.`x` + `table`.`y` + `table`.`a` + `table`.`b`\n)"
    );

    const bigIntAdd5 = o.bigIntAdd(
        o.bigIntSub(table.columns.x, table.columns.y),
        table.columns.z
    );
    t.deepEqual(
        new o.SqlFormatter().format(
            o.QueryTreeUtil.toSql(bigIntAdd5.queryTree)
        ),
        "((`table`.`x` - `table`.`y`) + `table`.`z`)"
    );

    const bigIntAdd6 = o.bigIntAdd(
        table.columns.x
    );
    t.deepEqual(
        new o.SqlFormatter().format(
            o.QueryTreeUtil.toSql(bigIntAdd6.queryTree)
        ),
        "`table`.`x`"
    );

    const bigIntAdd7 = o.bigIntAdd(
    );
    t.deepEqual(
        new o.SqlFormatter().format(
            o.QueryTreeUtil.toSql(bigIntAdd7.queryTree)
        ),
        "0"
    );

    const bigIntAdd8 = o.bigIntAdd(
        bigIntAdd7,
        table.columns.x
    );
    t.deepEqual(
        new o.SqlFormatter().format(
            o.QueryTreeUtil.toSql(bigIntAdd8.queryTree)
        ),
        "(0 + `table`.`x`)"
    );

    const bigIntAdd9 = o.bigIntAdd(
        0n,
        table.columns.x
    );
    t.deepEqual(
        new o.SqlFormatter().format(
            o.QueryTreeUtil.toSql(bigIntAdd9.queryTree)
        ),
        "(0 + `table`.`x`)"
    );

    t.end();
});