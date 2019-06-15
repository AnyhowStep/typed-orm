import * as sd from "type-mapping";
import * as tape from "tape";
import * as o from "../../../../../../../dist/src/main";
import * as fs from "fs";

tape(__filename, (t) => {
    const table = o.table(
        "table",
        {
            x : sd.unsignedInteger(),
            y : sd.orNull(sd.unsignedInteger()),
            z : sd.unsignedInteger(),
            a : sd.finiteNumberToBoolean(),
            b : sd.orNull(sd.finiteNumberToBoolean()),
        }
    );
    const query = o.from(table)
        .selectExpr(c => o.nullSafeEq(c.z, c.y))
        .select(() => [
            o.nullSafeEq(32, null).as("a"),
            o.nullSafeEq(null, null).as("b"),
            //TODO-DEBATE Should I allow a raw `null` literal here?
            o.nullSafeEq(null as null|string, "test").as("c"),
        ])
        .select(c => [
            o.nullSafeEq(c.a, true).as("d"),
            o.nullSafeEq(c.b, true).as("e"),
            o.nullSafeEq(c.a, c.b).as("f"),
            o.nullSafeEq(c.b, c.a).as("g"),
        ])
        .select(c => [
            o.nullSafeEq(o.nullSafeEq(c.y, c.x), false).as("nestedEq")
        ]);

    const formatter = new o.SqlFormatter();
    const sql = o.QueryTreeUtil.toSql(
        o.QueryUtil.queryTreeSelects(query)
    );
    const actual = formatter.format(sql);
    t.deepEqual(
        actual,
        fs.readFileSync(
            __filename.replace(/\.ts$/, ".sql")
        ).toString()
    );

    t.end();
});