import * as sd from "schema-decorator";
import * as tape from "tape";
import * as o from "../../../../../dist/src/main";
import * as fs from "fs";

tape(__filename, (t) => {
    const table = o.table(
        "table",
        {
            x : sd.naturalNumber(),
            y : sd.nullable(sd.string()),
            z : sd.boolean(),
            w : o.dateTime(),
        }
    ).addCandidateKey(c => [c.x, c.y])
    .addCandidateKey(c => [c.y, c.z]);

    const query = o.from(table)
        .whereEqCandidateKey(table, {
            w : new Date("2018-01-01 00:00:00"),
            y : "hey",
            x : 56,
        } as unknown as { x : number, y : string })
        .selectExpr(() => o.utcTimestamp());

    const formatter = new o.SqlFormatter();
    const sql = o.QueryTreeUtil.toSql(
        o.QueryUtil.queryTree(query)
    );
    const actual = formatter.format(sql);
    t.deepEqual(
        actual,
        fs.readFileSync(
            __filename.replace(/\.ts$/, ".sql")
        ).toString()
    );

    t.throws(() => {
        o.from(table)
            .whereEqCandidateKey(table, {
                w : new Date("2018-01-01 00:00:00"),
            } as unknown as { x : number, y : string });
    });

    t.end();
});