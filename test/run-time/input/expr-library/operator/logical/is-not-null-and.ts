import * as sd from "type-mapping";
import * as tape from "tape";
import * as o from "../../../../../../dist/src/main";

tape(__filename, (t) => {
    const table = o.table(
        "table",
        {
            x : sd.orNull(sd.bigInt())
        }
    );

    const and1 = o.isNotNullAnd(
        table.columns.x,
        ({x}) => o.gt(
            x,
            BigInt(100)
        )
    );
    t.deepEqual(
        new o.SqlFormatter().format(
            o.QueryTreeUtil.toSql(and1.queryTree)
        ),
        "(\n  (`table`.`x` IS NOT NULL) AND\n  (`table`.`x` > 100)\n)"
    );

    t.end();
});