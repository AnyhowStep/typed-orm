import * as sd from "type-mapping";
import * as tape from "tape";
import * as o from "../../../../../../dist/src/main";

tape(__filename, (t) => {
    const table = o.table(
        "table",
        {
            x : sd.finiteNumber(),
            y : sd.finiteNumber(),
            z : sd.finiteNumber(),
            a : sd.finiteNumber(),
            b : sd.finiteNumber(),
            c : sd.finiteNumber(),
        }
    );

    const add1 = o.add(
        table.columns.x,
        table.columns.y
    );
    t.deepEqual(
        new o.SqlFormatter().format(
            o.QueryTreeUtil.toSql(add1.queryTree)
        ),
        "(`table`.`x` + `table`.`y`)"
    );

    const add2 = o.add(
        table.columns.x,
        table.columns.y,
        table.columns.z,
    );
    t.deepEqual(
        new o.SqlFormatter().format(
            o.QueryTreeUtil.toSql(add2.queryTree)
        ),
        "(`table`.`x` + `table`.`y` + `table`.`z`)"
    );

    const add3 = o.add(
        add1,
        table.columns.a
    );
    t.deepEqual(
        new o.SqlFormatter().format(
            o.QueryTreeUtil.toSql(add3.queryTree)
        ),
        "(`table`.`x` + `table`.`y` + `table`.`a`)"
    );

    const add4 = o.add(
        add3,
        table.columns.b
    );
    t.deepEqual(
        new o.SqlFormatter().format(
            o.QueryTreeUtil.toSql(add4.queryTree)
        ),
        "(\n  `table`.`x` + `table`.`y` + `table`.`a` + `table`.`b`\n)"
    );

    const add5 = o.add(
        o.sub(table.columns.x, table.columns.y),
        table.columns.z
    );
    t.deepEqual(
        new o.SqlFormatter().format(
            o.QueryTreeUtil.toSql(add5.queryTree)
        ),
        "((`table`.`x` - `table`.`y`) + `table`.`z`)"
    );

    const add6 = o.add(
        table.columns.x
    );
    t.deepEqual(
        new o.SqlFormatter().format(
            o.QueryTreeUtil.toSql(add6.queryTree)
        ),
        "`table`.`x`"
    );

    const add7 = o.add(
    );
    t.deepEqual(
        new o.SqlFormatter().format(
            o.QueryTreeUtil.toSql(add7.queryTree)
        ),
        "0"
    );

    const add8 = o.add(
        add7,
        table.columns.x
    );
    t.deepEqual(
        new o.SqlFormatter().format(
            o.QueryTreeUtil.toSql(add8.queryTree)
        ),
        "(0 + `table`.`x`)"
    );

    const add9 = o.add(
        0,
        table.columns.x
    );
    t.deepEqual(
        new o.SqlFormatter().format(
            o.QueryTreeUtil.toSql(add9.queryTree)
        ),
        "(0 + `table`.`x`)"
    );

    t.end();
});