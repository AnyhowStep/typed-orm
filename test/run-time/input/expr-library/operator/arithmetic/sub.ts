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

    const sub1 = o.sub(
        table.columns.x,
        table.columns.y
    );
    t.deepEqual(
        new o.SqlFormatter().format(
            o.QueryTreeUtil.toSql(sub1.queryTree)
        ),
        "(`table`.`x` - `table`.`y`)"
    );

    const sub2 = o.sub(
        table.columns.x,
        table.columns.y,
        table.columns.z,
    );
    t.deepEqual(
        new o.SqlFormatter().format(
            o.QueryTreeUtil.toSql(sub2.queryTree)
        ),
        "(`table`.`x` - `table`.`y` - `table`.`z`)"
    );

    const sub3 = o.sub(
        sub1,
        table.columns.a
    );
    t.deepEqual(
        new o.SqlFormatter().format(
            o.QueryTreeUtil.toSql(sub3.queryTree)
        ),
        "((`table`.`x` - `table`.`y`) - `table`.`a`)"
    );

    const sub4 = o.sub(
        sub3,
        table.columns.b
    );
    t.deepEqual(
        new o.SqlFormatter().format(
            o.QueryTreeUtil.toSql(sub4.queryTree)
        ),
        "(\n  ((`table`.`x` - `table`.`y`) - `table`.`a`) - `table`.`b`\n)"
    );

    const sub5 = o.sub(
        o.mul(table.columns.x, table.columns.y),
        table.columns.z
    );
    t.deepEqual(
        new o.SqlFormatter().format(
            o.QueryTreeUtil.toSql(sub5.queryTree)
        ),
        "((`table`.`x` * `table`.`y`) - `table`.`z`)"
    );

    const sub6 = o.sub(
        table.columns.x
    );
    t.deepEqual(
        new o.SqlFormatter().format(
            o.QueryTreeUtil.toSql(sub6.queryTree)
        ),
        "`table`.`x`"
    );

    const sub7 = o.sub(
    );
    t.deepEqual(
        new o.SqlFormatter().format(
            o.QueryTreeUtil.toSql(sub7.queryTree)
        ),
        "0"
    );

    const sub8 = o.sub(
        sub7,
        table.columns.x
    );
    t.deepEqual(
        new o.SqlFormatter().format(
            o.QueryTreeUtil.toSql(sub8.queryTree)
        ),
        "(0 - `table`.`x`)"
    );

    const sub9 = o.sub(
        0,
        table.columns.x
    );
    t.deepEqual(
        new o.SqlFormatter().format(
            o.QueryTreeUtil.toSql(sub9.queryTree)
        ),
        "(0 - `table`.`x`)"
    );

    t.end();
});