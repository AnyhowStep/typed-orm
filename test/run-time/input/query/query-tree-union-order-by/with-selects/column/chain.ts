import * as sd from "schema-decorator";
import * as tape from "tape";
import * as o from "../../../../../../../dist/src/main";
import * as fs from "fs";

tape(__filename, (t) => {
    const table = o.table(
        "table",
        {
            x : sd.naturalNumber(),
            y : sd.string(),
            z : sd.boolean(),
        }
    );

    const query = o.from(table)
        .select(c => [c.x, c.y, c.z, c.x.as("test"), c.y.as("test2"), c.z.as("test3")])
        .unionOrderBy(c => [
            c.x
        ])
        .unionOrderBy(c => [
            [c.y, o.ASC]
        ])
        .unionOrderBy(c => [
            [c.z, o.DESC]
        ])
        .unionOrderBy(c => [
            c.test
        ])
        .unionOrderBy(c => [
            [c.test2, o.ASC]
        ])
        .unionOrderBy(c => [
            [c.test3, o.DESC]
        ]);

    const formatter = new o.SqlFormatter();
    const sql = o.QueryTreeUtil.toSql(
        o.QueryUtil.queryTreeUnionOrderBy(query)
    );
    const actual = formatter.format(sql);
    t.deepEqual(
        actual,
        fs.readFileSync(
            __filename.replace(/\.ts$/, "-expected.sql")
        ).toString()
    );

    t.end();
});